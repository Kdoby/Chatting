package NotModified.Chatting.global.auth.token.api;

import NotModified.Chatting.global.auth.token.dto.request.SignupRequest;
import NotModified.Chatting.global.auth.token.dto.Tokens;
import NotModified.Chatting.global.auth.token.dto.request.SigninRequest;
import NotModified.Chatting.global.auth.token.dto.response.TokenResponse;
import NotModified.Chatting.global.auth.token.service.AuthService;
import NotModified.Chatting.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {

        authService.signup(request);

        return ResponseEntity.ok(
                "회원가입이 완료되었습니다."
        );
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> signin(
            @RequestBody SigninRequest request,
            HttpServletResponse response
    ) {

        Tokens tokens = authService.login(request);

        CookieUtil.addCookie(response, "refreshToken", tokens.refreshToken(), 60 * 60 * 24 * 14);

        return ResponseEntity.ok(
                new TokenResponse(tokens.accessToken())
        );
    }
}
