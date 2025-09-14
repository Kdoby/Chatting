package NotModified.Chatting.global.auth.token.service;

import NotModified.Chatting.domain.member.dto.request.CreateMemberRequest;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import NotModified.Chatting.global.auth.token.dto.Tokens;
import NotModified.Chatting.global.auth.token.dto.request.SigninRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public Member signup(CreateMemberRequest request) {

        String username = request.getUsername();
        String nickname = request.getNickname();

        validateDuplicationMember(username);
        validateDuplicationNickname(nickname);

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Member member = Member.builder()
                .username(username)
                .nickname(nickname)
                .password(encodedPassword)
                .build();

        memberRepository.save(member);

        return member;
    }

    @Override
    public Tokens login(SigninRequest request) {

        Member member = memberRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if(!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return tokenService.createTokens(member.getId());
    }

    private void validateDuplicationMember(String username) {

        memberRepository.findByUsername(username)
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
                });
    }

    private void validateDuplicationNickname(String nickname) {

        memberRepository.findByNickname(nickname)
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
                });
    }

}
