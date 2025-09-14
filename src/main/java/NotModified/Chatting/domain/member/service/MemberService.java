package NotModified.Chatting.domain.member.service;

import NotModified.Chatting.domain.member.dto.response.MemberProfileResponse;
import NotModified.Chatting.domain.member.model.Member;

public interface MemberService {

    /* 유저 찾기 */
    Member findMember(Long userId);
    Member findMember(String nickname);

    /* 유저 프로필 조회 */
    MemberProfileResponse getMemberProfile(Long id);
}
