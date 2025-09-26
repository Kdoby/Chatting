package NotModified.Chatting.domain.chat.repository;

import NotModified.Chatting.domain.chat.model.Chat;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findAllByRoomAndSendTimeAfter(ChatRoom room, LocalDateTime time);

    /* 특정 범위 내의 채팅 목록 조회 */
    @Query("SELECT c FROM Chat c " +
            "JOIN FETCH c.room " +
            "JOIN FETCH c.sender " +
            "WHERE c.room.id = :roomId " +
            "AND c.sendTime Between :start AND :end " +
            "AND c.type = 'CHAT'")
    List<Chat> findAllByRoom_IdAndSendTimeBetween(@Param("roomId") Long roomId,
                                                  @Param("start") LocalDateTime start,
                                                  @Param("end") LocalDateTime end);
}
