package NotModified.Chatting.domain.friendship.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateFriendshipRequest {
    private String addresseeNickname;
}
