package NotModified.Chatting.domain.friendship.dto.response;

import NotModified.Chatting.domain.friendship.model.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipStatusResponse {
    private Long friendshipId;
    private FriendshipStatus status;
    private FriendRequestDirection direction;
}
