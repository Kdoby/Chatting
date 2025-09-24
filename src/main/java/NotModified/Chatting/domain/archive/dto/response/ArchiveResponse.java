package NotModified.Chatting.domain.archive.dto.response;

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
public class ArchiveResponse {
    private Long archiveId;
    private String title;
    private String content;
    private String thumbnailImage;
    private List<String> members;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
