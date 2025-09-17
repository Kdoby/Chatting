package NotModified.Chatting.domain.member.api;

import NotModified.Chatting.domain.member.dto.response.MemberProfileResponse;
import NotModified.Chatting.domain.member.service.MemberService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<MemberProfileResponse>> getMyProfile(
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        MemberProfileResponse response = memberService.getMemberProfile(auth.userId());

        return ResponseEntity.ok().body(
                new ApiResponse<>(response)
        );
    }
}
