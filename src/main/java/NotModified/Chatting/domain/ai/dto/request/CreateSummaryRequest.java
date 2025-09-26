package NotModified.Chatting.domain.ai.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSummaryRequest {
    private LocalDateTime start;
    private LocalDateTime end;
    private String text;    // test 용 변수
}
