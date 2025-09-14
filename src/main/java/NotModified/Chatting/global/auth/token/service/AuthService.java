package NotModified.Chatting.global.auth.token.service;

import NotModified.Chatting.global.auth.token.dto.request.SignupRequest;
import NotModified.Chatting.domain.member.model.Member;
import NotModified.Chatting.global.auth.token.dto.Tokens;
import NotModified.Chatting.global.auth.token.dto.request.SigninRequest;

public interface AuthService {

    /* 회원가입 */
    Member signup(SignupRequest request);

    /* 로그인 */
    Tokens login(SigninRequest request);
}
