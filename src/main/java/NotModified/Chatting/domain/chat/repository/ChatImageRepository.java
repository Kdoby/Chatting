package NotModified.Chatting.domain.chat.repository;

import NotModified.Chatting.domain.chat.model.ChatImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatImageRepository extends JpaRepository<ChatImage, Long> {

    /* 특정 채팅방에 속한 이미지 목록 조회 */
    List<ChatImage> findByRoom_Id(Long roomId);

    /* 특정 채팅에서 보낸 이미지 목록 조회 */
    List<ChatImage> findByChat_Id(Long chatId);
}
