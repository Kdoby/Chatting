package NotModified.Chatting.domain.friendship.api;

import NotModified.Chatting.domain.friendship.dto.request.CreateFriendshipRequest;
import NotModified.Chatting.domain.friendship.dto.response.FriendshipListResponse;
import NotModified.Chatting.domain.friendship.dto.response.FriendshipStatusResponse;
import NotModified.Chatting.domain.friendship.dto.response.WaitingFriendshipResponse;
import NotModified.Chatting.domain.friendship.service.FriendshipService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/friend")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createFriendRequest(
            @AuthenticationPrincipal JwtAuthentication auth,
            @RequestBody CreateFriendshipRequest request
            ) {
        friendshipService.createFriendship(auth.userId(), request.getAddresseeNickname());

        return ResponseEntity.ok().body(
                new ApiResponse<>("친구 요청 성공")
        );
    }

    @PostMapping("/{friendshipId}")
    public ResponseEntity<ApiResponse<String>> approveFriendRequest(
            @AuthenticationPrincipal JwtAuthentication auth,
            @PathVariable("friendshipId") Long friendshipId
    ) {
        String response =
                friendshipService.approveFriendshipRequest(auth.userId(), friendshipId);

        return ResponseEntity.ok().body(
                new ApiResponse<>(response)
        );
    }

    @GetMapping("/requests/sent")
    public ResponseEntity<ApiResponse<List<WaitingFriendshipResponse>>> getSentWaitingFriendRequestList(
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        List<WaitingFriendshipResponse> responses =
                friendshipService.getSentFriendshipRequest(auth.userId());

        return ResponseEntity.ok().body(
                new ApiResponse<>("보낸 친구 요청 리스트 조회 성공", responses)
        );
    }

    @GetMapping("/requests/received")
    public ResponseEntity<ApiResponse<List<WaitingFriendshipResponse>>> getReceivedWaitingFriendRequestList(
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        List<WaitingFriendshipResponse> responses =
                friendshipService.getReceivedFriendshipRequest(auth.userId());

        return ResponseEntity.ok().body(
                new ApiResponse<>("받은 친구 요청 리스트 조회 성공", responses)
        );
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<ApiResponse<List<FriendshipListResponse>>> getFriendList(
            @PathVariable("userId") Long userId
    ) {
        List<FriendshipListResponse> responses =
                friendshipService.getFriendList(userId);

        return ResponseEntity.ok().body(
                new ApiResponse<>("유저의 친구 목록 조회 성공", responses)
        );
    }

    @GetMapping("/{otherUserId}")
    public ResponseEntity<ApiResponse<FriendshipStatusResponse>> checkFriendship(
            @AuthenticationPrincipal JwtAuthentication auth,
            @PathVariable("otherUserId") Long otherUserId
    ) {
        FriendshipStatusResponse response = friendshipService.getFriendshipBetween(auth.userId(), otherUserId);

        return ResponseEntity.ok().body(
                new ApiResponse<>("유저 간의 관계 조회 성공", response)
        );
    }
}
