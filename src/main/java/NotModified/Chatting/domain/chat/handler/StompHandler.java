package NotModified.Chatting.domain.chat.handler;

import NotModified.Chatting.domain.chat.exception.WebSocketException;
import NotModified.Chatting.domain.chat.repository.ChatRoomMemberRepository;
import NotModified.Chatting.domain.member.exception.UserNotFoundException;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import NotModified.Chatting.global.auth.token.service.JwtTokenProvider;
import NotModified.Chatting.global.auth.token.service.TokenService;
import NotModified.Chatting.global.util.ExtractUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    public static final String DEFAULT_PATH = "/sub/chat/room/";

    private final TokenService tokenService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if (StompCommand.CONNECT.equals(command)) {  // websocket 연결 요청 -> JWT 인증

            Member member = getMemberByAuthorizationHeader(
                    accessor.getFirstNativeHeader("Authorization")
            );

            setValue(accessor, "userId", member.getId());
            setValue(accessor, "nickname", member.getNickname());
        } else if(StompCommand.SUBSCRIBE.equals(command)) {

            Long userId = (Long) getValue(accessor, "userId");
            Long roomId = parseRoomIdFromPath(accessor);

            log.debug("userId : " + userId + "roomId : " + roomId);

            setValue(accessor, "roomId", roomId);
            validateMemberInRoom(userId, roomId);   // 채팅방에 속한 회원인지 확인
        } else if(StompCommand.DISCONNECT == command) {

            Long userId = (Long) getValue(accessor, "userId");

            log.info("DISCONNECTED userId : {}", userId);
        }

        log.info("header : " + message.getHeaders());
        log.info("message:" + message);

        return message;
    }
    private Member getMemberByAuthorizationHeader(String authHeaderValue) {

        String accessToken = getTokenByAuthorizationHeader(authHeaderValue);

        Claims claims = jwtTokenProvider.getClaims(accessToken);
        Long userId = Long.valueOf(claims.getSubject());

        return memberRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    private String getTokenByAuthorizationHeader(String authHeaderValue) {

        if(Objects.isNull(authHeaderValue) || authHeaderValue.isBlank()) {
            throw new WebSocketException("authHeaderValue: " + authHeaderValue);
        }

        String accessToken = ExtractUtil.extractToken(authHeaderValue);
        jwtTokenProvider.validateToken(accessToken);

        return accessToken;
    }

    private Long parseRoomIdFromPath(StompHeaderAccessor accessor) {

        String destination = accessor.getDestination();

        return Long.parseLong(destination.substring(DEFAULT_PATH.length()));
    }

    // 채팅방 소속 멤버인지 확인
    private void validateMemberInRoom(Long userId, Long roomId) {

        chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new WebSocketException(
                        String.format("room Id : {} userId : {} 로 조회된 결과가 없습니다. ", roomId, userId)
                ));
    }
    private Object getValue(StompHeaderAccessor accessor, String key) {

        Map<String, Object> sessionAttributes = getSessionAttribute(accessor);
        Object value = sessionAttributes.get(key);

        if(Objects.isNull(value)) {
            throw new WebSocketException(key + " 에 해당하는 값이 없습니다.");
        }

        return value;
    }

    private void setValue(StompHeaderAccessor accessor, String key, Object value) {

        Map<String, Object> sessionAttributes = getSessionAttribute(accessor);
        sessionAttributes.put(key, value);
    }

    private Map<String, Object> getSessionAttribute(StompHeaderAccessor accessor) {

        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();

        if(Objects.isNull(sessionAttributes)) {
            throw new WebSocketException("SessionAttributes가 null입니다.");
        }

        return sessionAttributes;
    }
}
