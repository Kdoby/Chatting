package NotModified.Chatting.global.auth.token.dto.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;
    private String credentials;

    protected JwtAuthenticationToken() {
        super(null);
        this.principal = null;
        this.credentials = null;
        setAuthenticated(false);
    }

    // 인증 완료 전: 토큰만 있는 상태
    public JwtAuthenticationToken(String token) {
        super(null);
        this.principal = null;
        this.credentials = token;
        setAuthenticated(false);
    }

    // 인증 완료 후: userId + 권한
    public JwtAuthenticationToken(Long userId,
                                  Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = userId;
        this.credentials = null;
        setAuthenticated(true);
    }

    public JwtAuthenticationToken(
            Object principal, String credentials, Collection<? extends GrantedAuthority> authorities
    ) {
        super(authorities);
        super.setAuthenticated(true);

        this.principal = principal;
        this.credentials = credentials;
    }
}
