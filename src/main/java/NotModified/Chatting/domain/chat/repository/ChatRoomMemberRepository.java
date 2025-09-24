package NotModified.Chatting.domain.chat.repository;

import NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import NotModified.Chatting.domain.chat.model.ChatRoomMember;
import NotModified.Chatting.domain.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {

    /* 특정 채팅방에 존재하는 사용자 엔터티 조회 */
    @Query("SELECT crm FROM ChatRoomMember crm " +
            "WHERE crm.room.id = :roomId " +
            "AND crm.member.id = :userId")
    Optional<ChatRoomMember> findByRoomAndMember(@Param("roomId") Long roomId,
                                                 @Param("userId") Long userId);
    List<ChatRoomMember> findByRoom_Id(Long roomId);

    /* 특정 사용자가 속한 채팅방 목록 조회 */
    List<ChatRoomMember> findByMember_Id(Long userId);

    /* 채팅방에 특정 사용자 존재 여부 확인 */
    boolean existsByRoomAndMember(ChatRoom room, Member member);
    boolean existsByRoom_IdAndMember_Id(Long roomId, Long userId);

    /* 특정 채팅방에 속한 사용자 수 조회 */
    @Query("SELECT COUNT(crm) FROM ChatRoomMember crm " +
            "WHERE crm.room.id = :roomId")
    int countMembersInRoom(@Param("roomId") Long roomId);

    /* 특정 사용자가 속한 채팅방 목록 조회 - DTO projection */
    @Query("SELECT new NotModified.Chatting.domain.chat.dto.response.ChatRoomResponse(crm.room.id, crm.room.roomName, COUNT(crm2)) " +
            "FROM ChatRoomMember crm " +
            "JOIN ChatRoomMember crm2 ON crm.room.id = crm2.room.id " +
            "WHERE crm.member.id = :userId " +
            "GROUP BY crm.room.id, crm.room.roomName")
    List<ChatRoomResponse> findChatRoomList(@Param("userId") Long userId);
}
