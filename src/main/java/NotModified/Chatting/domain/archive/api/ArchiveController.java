package NotModified.Chatting.domain.archive.api;

import NotModified.Chatting.domain.archive.dto.request.CreateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.request.UpdateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.response.ArchiveContentResponse;
import NotModified.Chatting.domain.archive.dto.response.ArchiveResponse;
import NotModified.Chatting.domain.archive.service.ArchiveService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/archive")
public class ArchiveController {

    private final ArchiveService archiveService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createArchive(
            @RequestBody CreateArchiveRequest request,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
           archiveService.createArchive(auth.userId(), request);

           return ResponseEntity.ok().body(
                   new ApiResponse<>("아카이브 생성 성공")
           );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<String>> updateArchiveContent(
            @RequestBody UpdateArchiveRequest request,
            @AuthenticationPrincipal JwtAuthentication auth
    ){
        archiveService.updateArchive(auth.userId(), request);
        
        return ResponseEntity.ok().body(
                new ApiResponse<>("아카이브 수정 성공")
        );
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<List<ArchiveResponse>>> getArchiveList(
            @PathVariable("roomId") Long roomId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        List<ArchiveResponse> responses =
                archiveService.getArchivesInRoom(roomId, auth.userId());

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "채팅방의 아카이브 목록 조회 성공",
                        responses
                )
        );
    }

    @GetMapping("/content/{archiveId}")
    public ResponseEntity<ApiResponse<ArchiveContentResponse>> getArchiveContent(
            @PathVariable("archiveId") Long archiveId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        ArchiveContentResponse response =
                archiveService.getArchiveContent(auth.userId(), archiveId);

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "아카이브 내용 조회 성공",
                        response
                )
        );
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ArchiveResponse>>> getArchiveList(
            @AuthenticationPrincipal JwtAuthentication auth
    ) {

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "사용자의 아카이브 목록 조회 성공",
                        archiveService.getArchivesOfUser(auth.userId())
                )
        );
    }
}
