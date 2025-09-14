package NotModified.Chatting.global.auth.token.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;

    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 15;

    public enum TokenStatus { VALID, EXPIRED, INVALID };

    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Long userId) {
        return createToken(userId, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public String createToken(Long userId, long tokenValid) {
        Claims claims = Jwts.claims().setSubject(userId.toString());

        // 토큰 발급 시간
        Date now = new Date();
        // 토큰 만료 시간
        Date validity = new Date(now.getTime() + tokenValid);
        
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)  // 서명 생성
                .compact();     // 최종 문자열 토큰 생성
    }

    public TokenStatus validateToken(String token) {
        try {
            // 서명 + 만료 유효성 검사
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return TokenStatus.VALID;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return TokenStatus.EXPIRED;
        } catch (Exception e) {
            return TokenStatus.INVALID;
        }
    }

    public Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
