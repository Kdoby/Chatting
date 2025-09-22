package NotModified.Chatting.domain.friendship.repository;

import NotModified.Chatting.domain.friendship.model.Friendship;
import NotModified.Chatting.domain.friendship.model.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    /* 보낸 친구 요청 목록 조회 (requester.id 기준, WAITING-요청중, ACCEPTED-친구) */
    @Query("SELECT f FROM Friendship f " +
            "JOIN FETCH f.addressee " +
            "JOIN FETCH f.requester " +
            "WHERE f.requester.id = :userId " +
            "AND f.status = :status")
    List<Friendship> findByRequester_IdAndStatus(@Param("userId") Long userId,
                                                 @Param("status") FriendshipStatus status);

    /* 받은 친구 요청 목록 조회 (addressee.id 기준, WAITING-요청중, ACCEPTED-친구) */
    @Query("SELECT f FROM Friendship f " +
            "JOIN FETCH f.requester " +
            "JOIN FETCH f.addressee " +
            "WHERE f.addressee.id = :userId " +
            "AND f.status = :status")
    List<Friendship> findByAddressee_IdAndStatus(@Param("userId") Long userId,
                                                 @Param("status") FriendshipStatus status);

    /* 특정 유저와의 친구관계 체크 */
    @Query("SELECT f FROM Friendship f " +
            "WHERE (f.requester.id = :myUserId AND f.addressee.id = :otherUserId) " +
            "OR (f.requester.id = :otherUserId AND f.addressee.id = :myUserId)")
    Optional<Friendship> findFriendshipBetween(@Param("myUserId") Long myUserId,
                                               @Param("otherUserId") Long otherUserId);
    @Query("SELECT f FROM Friendship f " +
            "WHERE (f.requester.id = :myUserId AND f.addressee.id = :otherUserId) " +
            "OR (f.requester.id = :otherUserId AND f.addressee.id = :myUserId) " +
            "AND f.status = :status")
    Optional<Friendship> findFriendshipBetween(@Param("myUserId") Long myUserId,
                                               @Param("otherUserId") Long otherUserId,
                                               @Param("status") FriendshipStatus status);

    /* 친구가 아닌 사용자를 채팅방에 초대할 경우를 대비하기 위한 함수 */
    @Query("SELECT f FROM Friendship f " +
            "WHERE ((f.requester.id = :userId AND f.addressee.id IN :participants) " +
            "OR (f.requester.id IN :participants AND f.addressee.id = :userId)) " +
            "AND f.status = 'ACCEPTED'")
    List<Friendship> findAllFriendshipsWithMemberAndParticipants(@Param("userId") Long userId,
                                                                 @Param("participants") List<Long> participants);
}
