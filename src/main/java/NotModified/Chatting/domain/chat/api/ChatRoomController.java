package NotModified.Chatting.domain.chat.api;

import NotModified.Chatting.domain.chat.dto.request.CreateChatRoomRequest;
import NotModified.Chatting.domain.chat.dto.request.InviteChatRoomRequest;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomInfoResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse;
import NotModified.Chatting.domain.chat.service.ChatService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/chatroom")
public class ChatRoomController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    /* 그룹 채팅 생성 */
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createChatRoom(
            @AuthenticationPrincipal JwtAuthentication auth,
            @RequestBody CreateChatRoomRequest request
    ) {
        ChatResponse response = chatService.createChatRoom(request.getRoomName(), request.getParticipantsId(), auth.userId());

        messagingTemplate.convertAndSend("/sub/chat/room/" + response.getRoomId(), response);

        return ResponseEntity.ok().body(
                new ApiResponse<>("채팅방 생성 성공")
        );
    }

    /* 그룹 멤버 초대 */
    @PostMapping("/{roomId}")
    public ResponseEntity<ApiResponse<String>> inviteMembers(
            @AuthenticationPrincipal JwtAuthentication auth,
            @PathVariable("roomId") Long roomId,
            @RequestBody InviteChatRoomRequest request
    ){
        ChatResponse response = chatService.inviteMembers(roomId, request.getParticipantsId(), auth.userId());

        messagingTemplate.convertAndSend("/sub/chat/room/" + response.getRoomId(), response);

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "친구 초대 성공"
                )
        );
    }

    /* 채팅방 나가기 */
    @DeleteMapping("/{roomId}")
    public ResponseEntity<ApiResponse<ChatResponse>> leaveRoom(
            @PathVariable("roomId") Long roomId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        ChatResponse response = chatService.leaveRoom(roomId, auth.userId());

        messagingTemplate.convertAndSend("/sub/chat/room/" + roomId, response);

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방 퇴장 성공",
                        response
                )
        );
    }

    /* 채팅방 목록 조회 */
    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getChatRoomList(
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방 목록 조회 성공",
                        chatService.getChatRoomList(auth.userId())
                )
        );
    }

    /* 채팅방 정보 조회(ex) 참가자 목록)*/
    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<ChatRoomInfoResponse>> getChatRoomInfo(
            @AuthenticationPrincipal JwtAuthentication auth,
            @PathVariable("roomId") Long roomId
    ) {
        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방 정보 조회 성공",
                        chatService.getChatRoomInfo(roomId, auth.userId())
                )
        );
    }
}
