package NotModified.Chatting.domain.friendship.service;

import NotModified.Chatting.domain.friendship.dto.response.FriendshipStatusResponse;
import NotModified.Chatting.domain.friendship.dto.response.FriendshipListResponse;
import NotModified.Chatting.domain.friendship.dto.response.WaitingFriendshipResponse;
import NotModified.Chatting.domain.friendship.model.Friendship;

import java.util.List;

public interface FriendshipService {

    /* friendship(요청(WAITING) 또는 친구(ACCEPTED) 목록) 조회 */
    Friendship findFriendship(Long id);

    /* 친구 요청 보내기 */
    void createFriendship(Long requesterId, String addresseeNickname);

    /* 친구 요청 수락 */
    String approveFriendshipRequest(Long userId, Long friendshipId);

    /* 보낸 친구 요청 목록 조회 */
    List<WaitingFriendshipResponse> getSentFriendshipRequest(Long userId);

    /* 받은 친구 요청 목록 조회 */
    List<WaitingFriendshipResponse> getReceivedFriendshipRequest(Long userId);

    /* 친구 목록 조회 */
    List<FriendshipListResponse> getFriendList(Long userId);

    /* 두 유저 사이의 관계 조회 */
    FriendshipStatusResponse getFriendshipBetween(Long myUserId, Long otherUserId);
}
