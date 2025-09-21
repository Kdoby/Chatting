package NotModified.Chatting.domain.chat.service;

import NotModified.Chatting.domain.chat.dto.request.ChatRequest;
import NotModified.Chatting.domain.chat.dto.response.ChatImageResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomInfoResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ChatService {

    /* 채팅방 생성 */
    ChatResponse createChatRoom(String roomName, List<Long> participantsId, Long userId);

    /* 채팅방에 친구 초대 */
    ChatResponse inviteMembers(Long roomId, List<Long> participants, Long userId);

    /* 채팅방 나가기 */
    ChatResponse leaveRoom(Long roomId, Long userId);

    /* 채팅 기록 조회 (채팅방 소속 멤버인지 확인 필요) */
    List<ChatResponse> getChatList(Long roomId, Long userId);

    /* 채팅방 목록 조회 */
    List<ChatRoomResponse> getChatRoomList(Long userId);

    /* 채팅방 정보 조회 */
    ChatRoomInfoResponse getChatRoomInfo(Long roomId, Long userId);

    /* 텍스트 메시지 보내기 (서버가 받은 메시지를 response 로 바꿔서 브로드 캐스팅하기 위한 함수) */
    ChatResponse saveTextMessage(Long roomId, Long userId, ChatRequest request);

    /* 이미지 메시지 보내기 */
    ChatResponse saveImageMessage(Long roomId, Long userId, List<MultipartFile> files);

    /* 특정 채팅방에서 보낸 이미지 목록 조회 */
    List<ChatImageResponse> getImagesInChatRoom(Long roomId, Long userId);
}
