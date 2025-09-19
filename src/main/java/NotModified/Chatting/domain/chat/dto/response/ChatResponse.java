package NotModified.Chatting.domain.chat.dto.response;

import NotModified.Chatting.domain.chat.model.Chat;
import NotModified.Chatting.domain.chat.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private Long chatId;
    private Long roomId;
    private String senderNickname;
    private String message;
    private MessageType type;
    private LocalDateTime sendTime;

    // Entity -> DTO
    public static ChatResponse from(Chat chat) {
        return ChatResponse.builder()
                .chatId(chat.getId())
                .roomId(chat.getRoom().getId())
                .senderNickname(chat.getSender().getNickname())
                .message(chat.getMessage())
                .type(chat.getType())
                .sendTime(chat.getSendTime())
                .build();
    }
}
