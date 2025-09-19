package NotModified.Chatting.domain.chat.dto.request;

import NotModified.Chatting.domain.chat.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private Long roomId;
    private Long userId;
    private String message;
    private MessageType type;
}
