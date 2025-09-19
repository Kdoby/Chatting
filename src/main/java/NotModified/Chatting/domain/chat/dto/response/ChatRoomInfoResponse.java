package NotModified.Chatting.domain.chat.dto.response;

import NotModified.Chatting.domain.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomInfoResponse {
    private Long roomId;
    private String roomName;
    private List<String> participants;
    private int memberCount;
}
