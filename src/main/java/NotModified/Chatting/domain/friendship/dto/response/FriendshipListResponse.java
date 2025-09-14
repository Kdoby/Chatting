package NotModified.Chatting.domain.friendship.dto.response;

import NotModified.Chatting.domain.friendship.model.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipListResponse {
    private Long friendshipId;
    private String friendNickname;
    private FriendshipStatus status;
    private LocalDateTime createdAt;
}

