package NotModified.Chatting.domain.chat.service;

import NotModified.Chatting.domain.chat.dto.request.ChatRequest;
import NotModified.Chatting.domain.chat.dto.response.ChatImageResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomInfoResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse;
import NotModified.Chatting.domain.chat.exception.*;
import NotModified.Chatting.domain.chat.model.*;
import NotModified.Chatting.domain.chat.repository.ChatRepository;
import NotModified.Chatting.domain.chat.repository.ChatImageRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomMemberRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomRepository;
import NotModified.Chatting.domain.friendship.model.Friendship;
import NotModified.Chatting.domain.friendship.repository.FriendshipRepository;
import NotModified.Chatting.domain.member.exception.UserNotFoundException;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    private final MemberRepository memberRepository;
    private final FriendshipRepository friendshipRepository;

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRepository chatRepository;
    private final ChatImageRepository chatImageRepository;

    // private final SimpMessagingTemplate messagingTemplate;

    public ChatRoom findChatRoom(Long roomId) {

        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(roomId));
    }

    public ChatRoomMember findChatRoomMember(Long roomId, Long userId) {

        return chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new InvalidChatRoomAccessException(roomId, userId));
    }

    @Override
    public ChatResponse createChatRoom(String roomName, List<Long> participantsId, Long userId) {

        Member admin = memberRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        // 초대 권한 체크
        validateInvitation(userId, participantsId);

        // 로그인한 사용자도 포함
        participantsId.add(userId);

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

        // 초대 권한 체크: 채팅방에 속해있는지, 친구인지
        if (!chatRoomMemberRepository.existsByRoom_IdAndMember_Id(roomId, userId)) {
            throw new InvalidChatRoomAccessException(roomId, userId);
        }
        validateInvitation(userId, participants);

        return addMembersToRoom(room, participants);
    }

    private ChatResponse addMembersToRoom(ChatRoom room, List<Long> participantIds) {

        Member systemUser = memberRepository.findByUsername("SYSTEM")
                .orElseThrow(() -> new IllegalStateException("USER_NOT_FOUND"));

        List<Member> members = memberRepository.findAllById(participantIds);

        List<String> memberNicknames = new ArrayList<>();

        for (Member member : members) {

            // 이미 채팅방에 존재하는 사용자인 경우 pass
            if (chatRoomMemberRepository.existsByRoomAndMember(room, member)) continue;

            chatRoomMemberRepository.save(ChatRoomMember.builder()
                    .room(room)
                    .member(member)
                    .enterTime(LocalDateTime.now())
                    .build());

            memberNicknames.add(member.getNickname());
        }

        if (memberNicknames.isEmpty()) {
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

    private void validateInvitation(Long userId, List<Long> participants) {

        // 친구가 아닌 사용자가 한명이라도 있으면 초대할 수 x
        List<Friendship> friendships = friendshipRepository.findAllFriendshipsWithMemberAndParticipants(userId, participants);

        Set<Long> friendIds = friendships.stream()
                .map(f -> f.getRequester().getId().equals(userId)
                        ? f.getAddressee().getId()
                        : f.getRequester().getId())
                .collect(Collectors.toSet());

        for (Long pid : participants) {
            if (!friendIds.contains(pid)) {
                // 친구인 사용자가 아닌 경우 error
                throw new InvalidInvitationException(userId, pid);
            }
        }
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

        // 사용자가 채팅방에 입장한 이후의 메시지 목록만 조회
        return chatRepository.findAllByRoomAndSendTimeAfter(room, member.getEnterTime()).stream()
                .map(chat -> {
                    // 이미지 메시지인 경우, images 배열에 추가
                    if(chat.getType() == MessageType.IMAGE) {

                        List<String> images = chatImageRepository.findByChat_Id(chat.getId()).stream()
                                .map(img -> "/uploads/" + img.getStoredFileName())
                                .toList();

                        return ChatResponse.from(chat, images);
                    }

                    return ChatResponse.from(chat);
                })
                .toList();
    }

    @Override
    public List<ChatRoomResponse> getChatRoomList(Long userId) {

        return chatRoomMemberRepository.findChatRoomList(userId);
    }

    @Override
    public ChatRoomInfoResponse getChatRoomInfo(Long roomId, Long userId) {

        if (!chatRoomMemberRepository.existsByRoom_IdAndMember_Id(roomId, userId)) {
            throw new InvalidChatRoomAccessException(roomId, userId);
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
    public ChatResponse saveTextMessage(Long roomId, Long userId, ChatRequest request) {

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

    @Override
    public ChatResponse saveImageMessage(Long roomId, Long userId, List<MultipartFile> files) {

        ChatRoom room = findChatRoom(roomId);
        Member sender = memberRepository.findById(userId).orElseThrow();

        Chat chat = Chat.builder()
                .room(room)
                .sender(sender)
                .message("")
                .type(MessageType.IMAGE)
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        return ChatResponse.from(chat, saveImages(chat, files));
    }

    @Override
    public List<ChatImageResponse> getImagesInChatRoom(Long roomId, Long userId) {

        // 접근 권한 체크
        findChatRoomMember(roomId, userId);

        return chatImageRepository.findByRoom_Id(roomId).stream()
                .map(ChatImageResponse::from)
                .toList();
    }

    private List<String> saveImages(Chat chat, List<MultipartFile> files) {

        List<String> images = new ArrayList<>();

        for (MultipartFile file : files) {

            String path = saveImage(chat, file);
            images.add(path);
        }

        return images;
    }

    private String saveImage(Chat chat, MultipartFile file) {

        if (file.isEmpty()) {
            throw new EmptyFileException();
        }

        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID() + "_" + originalFileName;

        String path = UPLOAD_DIR + storedFileName;

        try {
            File destination = new File(path);
            destination.getParentFile().mkdirs();
            file.transferTo(destination);
        } catch (IOException e) {
            throw new FileSaveException(originalFileName);
        }

        // 채팅 이미지 저장
        chatImageRepository.save(ChatImage.builder()
                .room(chat.getRoom())
                .chat(chat)
                .originalFileName(originalFileName)
                .storedFileName(storedFileName)
                .build());

        return "/uploads/" + storedFileName;
    }
}
