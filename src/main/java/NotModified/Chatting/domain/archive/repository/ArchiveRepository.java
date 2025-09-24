package NotModified.Chatting.domain.archive.repository;

import NotModified.Chatting.domain.archive.model.Archive;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArchiveRepository extends JpaRepository<Archive, Long> {

    List<Archive> findByRoom_Id(Long roomId);
    List<Archive> findAllByRoomIn(List<ChatRoom> rooms);
}
