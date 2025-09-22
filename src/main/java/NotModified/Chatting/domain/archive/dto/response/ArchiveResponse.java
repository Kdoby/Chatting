package NotModified.Chatting.domain.archive.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArchiveResponse {
    private Long archiveId;
    private String content;
    private String thumbnailImage;
}
