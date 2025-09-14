package NotModified.Chatting.global.auth.token.api;

import NotModified.Chatting.global.auth.token.dto.response.TokenResponse;
import NotModified.Chatting.global.auth.token.service.TokenService;
import NotModified.Chatting.global.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/token")
public class TokenController {

    private final TokenService tokenService;

    // 액세스 토큰 재발급
    @PostMapping
    public ResponseEntity<TokenResponse> refreshAccessToken(
            @CookieValue("refreshToken") String refreshToken
    ) {
        String accessToken = tokenService.getAccessTokenByRefreshToken(refreshToken);

        return ResponseEntity.ok(
                new TokenResponse(accessToken)
        );
    }

    // 로그아웃
    @DeleteMapping
    public ResponseEntity<Void> expireRefreshToken(
            @CookieValue("refreshToken") String refreshToken
    ) {
        tokenService.deleteRefreshToken(refreshToken);

        ResponseCookie emptyCookie = CookieUtil.getEmptyCookie("refreshToken");

        return ResponseEntity.noContent()
                .header(SET_COOKIE, emptyCookie.toString()).build();
    }
}
