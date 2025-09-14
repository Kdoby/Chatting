package NotModified.Chatting.global.auth.token.service;

import NotModified.Chatting.domain.member.dto.request.CreateMemberRequest;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.global.auth.token.dto.Tokens;
import NotModified.Chatting.global.auth.token.dto.request.SigninRequest;
import NotModified.Chatting.global.auth.token.dto.response.TokenResponse;

public interface AuthService {

    /* 회원가입 */
    Member signup(CreateMemberRequest request);

    /* 로그인 */
    Tokens login(SigninRequest request);
}
