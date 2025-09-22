package NotModified.Chatting.domain.archive.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateArchiveRequest {
    private Long archiveId;
    private String content;
}
