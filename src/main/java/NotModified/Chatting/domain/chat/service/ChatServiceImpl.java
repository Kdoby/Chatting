package NotModified.Chatting.domain.chat.service;

import NotModified.Chatting.domain.chat.dto.request.ChatRequest;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomInfoResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse;
import NotModified.Chatting.domain.chat.model.Chat;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import NotModified.Chatting.domain.chat.model.ChatRoomMember;
import NotModified.Chatting.domain.chat.model.MessageType;
import NotModified.Chatting.domain.chat.repository.ChatRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomMemberRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomRepository;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRepository chatRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public ChatRoom findChatRoom(Long roomId) {

        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));
    }

    public ChatRoomMember findChatRoomMember(Long roomId, Long userId) {

        return chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방 또는 사용자입니다."));
    }

    @Override
    public ChatResponse createChatRoom(String roomName, List<Long> participantsId, Long userId) {

        Member admin = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        ChatRoom room = ChatRoom.builder()
                .roomName(roomName)
                .admin(admin)
                .build();
        chatRoomRepository.save(room);

        return addMembersToRoom(room, participantsId);
    }

    @Override
    public ChatResponse inviteMembers(Long roomId, List<Long> participants, Long userId) {

        ChatRoom room = findChatRoom(roomId);

        if(!chatRoomMemberRepository.existsByRoom_IdAndMember_Id(roomId, userId)) {
            throw new IllegalArgumentException("초대 권한이 없습니다.");
        }

        return addMembersToRoom(room, participants);
    }

    private ChatResponse addMembersToRoom(ChatRoom room, List<Long> participantIds) {

        Member systemUser = memberRepository.findByUsername("SYSTEM")
                .orElseThrow(() -> new IllegalStateException("USER_NOT_FOUND"));

        List<Member> members = memberRepository.findAllById(participantIds);

        List<String> memberNicknames = new ArrayList<>();

        for (Member member : members) {

            if(chatRoomMemberRepository.existsByRoomAndMember(room, member)) continue;

            chatRoomMemberRepository.save(ChatRoomMember.builder()
                    .room(room)
                    .member(member)
                    .enterTime(LocalDateTime.now())
                    .build());

            memberNicknames.add(member.getNickname());
        }

        if(memberNicknames.isEmpty()) {
            return ChatResponse.builder().build();
        }

        String joinedNicknames = String.join(", ", memberNicknames);
        String message = joinedNicknames + "님이 입장하셨습니다.";

        Chat chat = Chat.builder()
                .room(room)
                .sender(systemUser)
                .message(message)
                .type(MessageType.JOIN)
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        return ChatResponse.from(chat);
    }

    @Override
    public ChatResponse enterRoom(Long roomId, Long userId) {

        ChatRoom room = findChatRoom(roomId);
        Member member = memberRepository.findById(userId).orElseThrow();

        // 이미 방에 존재하는 경우
        if (chatRoomMemberRepository.existsByRoomAndMember(room, member)) {
            throw new IllegalStateException("이미 채팅방에 입장한 사용자입니다.");
        }

        chatRoomMemberRepository.save(ChatRoomMember.builder()
                .room(room)
                .member(member)
                .enterTime(LocalDateTime.now())
                .build());

        Chat chat = Chat.builder()
                .room(room)
                .sender(member)
                .message(member.getNickname() + "님이 입장하셨습니다.")
                .type(MessageType.JOIN)
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        return ChatResponse.from(chat);
    }

    @Override
    public ChatResponse leaveRoom(Long roomId, Long userId) {

        Member systemUser = memberRepository.findByUsername("SYSTEM")
                .orElseThrow(() -> new IllegalStateException("USER_NOT_FOUND"));

        ChatRoom room = findChatRoom(roomId);
        Member member = memberRepository.findById(userId).orElseThrow();

        ChatRoomMember chatRoomMember = findChatRoomMember(roomId, userId);

        Chat chat = Chat.builder()
                .room(room)
                .sender(systemUser)
                .message(member.getNickname() + "님이 퇴장하셨습니다.")
                .type(MessageType.LEAVE)
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        chatRoomMemberRepository.delete(chatRoomMember);

        return ChatResponse.from(chat);
    }

    @Override
    public List<ChatResponse> getChatList(Long roomId, Long userId) {

        ChatRoom room = findChatRoom(roomId);
        ChatRoomMember member = findChatRoomMember(roomId, userId);

        return chatRepository.findAllByRoomAndSendTimeAfter(room, member.getEnterTime()).stream()
                .map(ChatResponse::from)
                .toList();
    }

    @Override
    public List<ChatRoomResponse> getChatRoomList(Long userId) {

        return chatRoomMemberRepository.findChatRoomList(userId);
    }

    @Override
    public ChatRoomInfoResponse getChatRoomInfo(Long roomId, Long userId) {

        if (!chatRoomMemberRepository.existsByRoom_IdAndMember_Id(roomId, userId)) {
            throw new IllegalArgumentException("해당 채팅방에 대한 조회 권한이 없는 사용자입니다.");
        }


        List<ChatRoomMember> chatRoomMembers = chatRoomMemberRepository.findByRoom_Id(roomId);

        if (chatRoomMembers.isEmpty()) {
            return ChatRoomInfoResponse.builder().build();
        }

        String roomName = chatRoomMembers.get(0).getRoom().getRoomName();
        int count = chatRoomMembers.size();

        List<String> participants = chatRoomMembers.stream()
                .map(m -> m.getMember().getNickname())
                .toList();

        return ChatRoomInfoResponse.builder()
                .roomId(roomId)
                .roomName(roomName)
                .participants(participants)
                .memberCount(count)
                .build();
    }

    @Override
    public ChatResponse sendMessage(Long roomId, Long userId, ChatRequest request) {

        System.out.println("userId = " + userId);

        ChatRoom room = findChatRoom(roomId);
        Member sender = memberRepository.findById(userId).orElseThrow();

        Chat chat = Chat.builder()
                .room(room)
                .sender(sender)
                .message(request.getMessage())
                .type(MessageType.CHAT)
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        return ChatResponse.from(chat);
    }
}
