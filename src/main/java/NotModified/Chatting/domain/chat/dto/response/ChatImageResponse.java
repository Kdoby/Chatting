package NotModified.Chatting.domain.chat.dto.response;

import NotModified.Chatting.domain.chat.model.ChatImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatImageResponse {
    private Long imageId;
    private String senderNickname;
    private String imagePath;
    private LocalDateTime sendTime;

    public static ChatImageResponse from(ChatImage image) {

        return ChatImageResponse.builder()
                .imageId(image.getId())
                .senderNickname(image.getChat().getSender().getNickname())
                .imagePath("/uploads/" + image.getStoredFileName())
                .sendTime(image.getChat().getSendTime())
                .build();
    }
}
