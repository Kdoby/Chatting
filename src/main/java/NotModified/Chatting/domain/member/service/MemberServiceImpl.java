package NotModified.Chatting.domain.member.service;

import NotModified.Chatting.domain.member.dto.response.MemberProfileResponse;
import NotModified.Chatting.domain.member.exception.UserNotFoundException;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findMember(Long userId) {

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return member;
    }

    @Override
    public Member findMember(String nickname) {

        Member member = memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new UserNotFoundException(nickname));

        return member;
    }

    @Override
    public MemberProfileResponse getMemberProfile(Long userId) {

        Member member = findMember(userId);

        return new MemberProfileResponse(member.getNickname());
    }
}
