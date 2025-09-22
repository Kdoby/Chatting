package NotModified.Chatting.domain.friendship.service;

import NotModified.Chatting.domain.friendship.dto.response.FriendRequestDirection;
import NotModified.Chatting.domain.friendship.dto.response.FriendshipStatusResponse;
import NotModified.Chatting.domain.friendship.dto.response.FriendshipListResponse;
import NotModified.Chatting.domain.friendship.dto.response.WaitingFriendshipResponse;
import NotModified.Chatting.domain.friendship.exception.FriendshipNotFoundException;
import NotModified.Chatting.domain.friendship.exception.InvalidFriendshipApproveException;
import NotModified.Chatting.domain.friendship.exception.InvalidFriendshipRequestException;
import NotModified.Chatting.domain.friendship.model.Friendship;
import NotModified.Chatting.domain.friendship.model.FriendshipStatus;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.friendship.repository.FriendshipRepository;
import NotModified.Chatting.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService {

    private final MemberService memberService;
    private final FriendshipRepository friendshipRepository;

    @Override
    public Friendship findFriendship(Long id) {

        Friendship friendship = friendshipRepository.findById(id)
                .orElseThrow(() -> new FriendshipNotFoundException(id));

        return friendship;
    }

    @Override
    public void createFriendship(Long requesterId, String addresseeNickname) {

        // 요청 보낸 사람
        Member requester = memberService.findMember(requesterId);

        // 요청 받은 사람
        Member addressee = memberService.findMember(addresseeNickname);

        Optional<Friendship> friendshipOpt = friendshipRepository.findFriendshipBetween(requesterId, addressee.getId());

        // 이미 요청 대기 중이거나, 친구인 경우 요청 보낼 수 x
        if (friendshipOpt.isPresent()) {
            throw new InvalidFriendshipRequestException(requester.getId(), addressee.getId());
        }

        // 자기 자신에게는 요청 보낼 수 x
        if (requester.getId().equals(addressee.getId())) {
            throw new InvalidFriendshipRequestException(requester.getId(), addressee.getId());
        }

        Friendship friendship = Friendship.builder()
                .requester(requester)
                .addressee(addressee)
                .status(FriendshipStatus.WAITING)
                .build();

        requester.getSentFriendships().add(friendship);
        addressee.getReceivedFriendships().add(friendship);

        friendshipRepository.save(friendship);
    }

    @Override
    public String approveFriendshipRequest(Long userId, Long friendshipId) {

        Friendship friendship = findFriendship(friendshipId);

        if (!friendship.getAddressee().getId().equals(userId)) {

            throw new InvalidFriendshipApproveException(friendshipId);
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);

        return "친구 요청 수락";
    }

    @Override
    public List<WaitingFriendshipResponse> getSentFriendshipRequest(Long userId) {

        // 내가 보낸 요청 리스트
        List<Friendship> sentRequests = friendshipRepository.findByRequester_IdAndStatus(userId, FriendshipStatus.WAITING);

        return sentRequests.stream()
                .map(request -> WaitingFriendshipResponse.builder()
                        .friendshipId(request.getId())
                        .nickname(request.getAddressee().getNickname())
                        .status(request.getStatus())
                        .createdAt(request.getCreatedAt())
                        .direction(FriendRequestDirection.SENT)
                        .build())
                .toList();
    }

    @Override
    public List<WaitingFriendshipResponse> getReceivedFriendshipRequest(Long userId) {

        // 내가 받은 요청 리스트
        List<Friendship> receivedRequests = friendshipRepository.findByAddressee_IdAndStatus(userId, FriendshipStatus.WAITING);

        return receivedRequests.stream()
                .map(request -> WaitingFriendshipResponse.builder()
                        .friendshipId(request.getId())
                        .nickname(request.getRequester().getNickname())
                        .status(request.getStatus())
                        .createdAt(request.getCreatedAt())
                        .direction(FriendRequestDirection.RECEIVED)
                        .build())
                .toList();
    }

    @Override
    public List<FriendshipListResponse> getFriendList(String nickname) {

        Member member = memberService.findMember(nickname);
        List<Friendship> sentRequests = friendshipRepository.findByRequester_IdAndStatus(member.getId(), FriendshipStatus.ACCEPTED);
        List<Friendship> receivedRequests = friendshipRepository.findByAddressee_IdAndStatus(member.getId(), FriendshipStatus.ACCEPTED);

        List<FriendshipListResponse> responses = Stream.concat(
                sentRequests.stream().map(req -> toResponse(req, true)),
                receivedRequests.stream().map(req -> toResponse(req, false))
        ).toList();

        return responses;
    }

    /* 사용자 간의 관계 조회 */
    @Override
    public FriendshipStatusResponse getFriendshipBetween(Long myUserId, Long otherUserId) {

        return friendshipRepository.findFriendshipBetween(myUserId, otherUserId, FriendshipStatus.ACCEPTED)
                .map(friendship -> {

                    FriendRequestDirection direction = friendship.getRequester().getId().equals(myUserId) ?
                            FriendRequestDirection.SENT :
                            FriendRequestDirection.RECEIVED;

                    return FriendshipStatusResponse.builder()
                            .friendshipId(friendship.getId())
                            .status(friendship.getStatus())
                            .direction(direction)
                            .build();
                }) // 친구 관계가 아닌 경우
                .orElseGet(() -> FriendshipStatusResponse.builder()
                        .status(FriendshipStatus.NONE)
                        .build());
    }

    private FriendshipListResponse toResponse(Friendship friendship, boolean isSent) {

        Member friend = isSent ?
                friendship.getAddressee() :
                friendship.getRequester();

        return FriendshipListResponse.builder()
                .friendshipId(friendship.getId())
                .friendId(friend.getId())
                .friendNickname(friend.getNickname())
                .status(friendship.getStatus())
                .createdAt(friendship.getCreatedAt())
                .build();
    }
}
