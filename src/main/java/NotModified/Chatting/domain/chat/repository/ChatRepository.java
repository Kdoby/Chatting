package NotModified.Chatting.domain.chat.repository;

import NotModified.Chatting.domain.chat.model.Chat;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findAllByRoomAndSendTimeAfter(ChatRoom room, LocalDateTime time);
}
