package NotModified.Chatting.domain.archive.dto.request;

import NotModified.Chatting.domain.chat.model.ChatImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateArchiveRequest {
    private Long roomId;
    private String title;
    private String content;
    private List<Long> images;
    private Long thumbnailImageId;
}
