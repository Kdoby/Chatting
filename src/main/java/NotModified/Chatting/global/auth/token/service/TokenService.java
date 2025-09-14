package NotModified.Chatting.global.auth.token.service;

import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import NotModified.Chatting.global.auth.token.dto.Tokens;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthenticationToken;
import NotModified.Chatting.global.auth.token.dto.response.TokenResponse;
import NotModified.Chatting.global.auth.token.exception.ExpiredRefreshTokenException;
import NotModified.Chatting.global.auth.token.exception.NotFoundCookieException;
import NotModified.Chatting.global.auth.token.exception.RefreshTokenNotFoundException;
import io.jsonwebtoken.Claims;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
/* 토큰 검증 서비스 */
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public Tokens createTokens(Long userId) {

        String accessToken = createAccessToken(userId);
        String refreshToken = createRefreshToken(userId);

        return new Tokens(accessToken, refreshToken);
    }

    // 액세스 토큰 발급
    public String createAccessToken(Long userId) {

        return jwtTokenProvider.createAccessToken(userId);
    }

    // 리프레쉬 토큰 발급 (DB 저장)
    public String createRefreshToken(Long userId) {

        String refreshToken = UUID.randomUUID().toString();

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        member.setRefreshToken(refreshToken);
        member.setRefreshTokenExpiry(LocalDateTime.now().plusDays(14));

        return memberRepository.save(member).getRefreshToken();

    }

    // 액세스 토큰으로 사용자 정보 조회
    public JwtAuthenticationToken getAuthenticationByAccessToken(String accessToken) {

        jwtTokenProvider.validateToken(accessToken);

        Claims claims = jwtTokenProvider.getClaims(accessToken);

        Long userId = Long.valueOf(claims.getSubject());

        JwtAuthentication principal = new JwtAuthentication(userId, accessToken);

        return new JwtAuthenticationToken(principal, null, List.of());
    }

    // 리프레쉬 토큰을 이용해서 액세스 토큰 재발급 (refresh)
    public String getAccessTokenByRefreshToken(@NotBlank String refreshToken) {

        checkRefreshToken(refreshToken);

        return memberRepository.findByRefreshToken(refreshToken)
                .map(member -> {
                    // 리프레쉬 토큰 만료일 체크
                    if(member.getRefreshTokenExpiry() == null ||
                            member.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) {
                        throw new ExpiredRefreshTokenException();
                    }
                    return createAccessToken(member.getId());
                })
                .orElseThrow(RefreshTokenNotFoundException::new);
    }

    // 리프레쉬 토큰 삭제
    public void deleteRefreshToken(String refreshToken) {

        checkRefreshToken(refreshToken);

        memberRepository.findByRefreshToken(refreshToken)
                .ifPresent(member -> {
                    member.setRefreshToken(null);
                    member.setRefreshTokenExpiry(null);
                    memberRepository.save(member);
                });
    }

    private void checkRefreshToken(String refreshToken) {

        if(Objects.isNull(refreshToken) || refreshToken.isBlank()) {
            throw new NotFoundCookieException();
        }
    }
}
