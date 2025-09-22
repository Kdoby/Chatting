package NotModified.Chatting.domain.archive.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArchiveContentResponse {
    private Long archiveId;
    private String content;
    private Map<String, Boolean> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
