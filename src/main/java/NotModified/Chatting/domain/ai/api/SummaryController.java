package NotModified.Chatting.domain.ai.api;

import NotModified.Chatting.domain.ai.dto.request.CreateSummaryRequest;
import NotModified.Chatting.domain.ai.dto.response.SummaryResponse;
import NotModified.Chatting.domain.ai.service.SummaryService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/summary")
public class SummaryController {

    private final SummaryService summarizeService;

    /* test 전용 api */
    @PostMapping
    public ResponseEntity<ApiResponse<String>> summarize(
            @RequestBody CreateSummaryRequest request,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방 내용 요약 성공",
                        summarizeService.getSummary(request.getText())
                )
        );
    }

    @PostMapping("/{roomId}")
    public ResponseEntity<ApiResponse<SummaryResponse>> summarizeChat(
            @PathVariable("roomId") Long roomId,
            @RequestBody CreateSummaryRequest request,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방 내용 요약 성공",
                        summarizeService.getSummary(roomId, auth.userId(), request)
                )
        );
    }
}
