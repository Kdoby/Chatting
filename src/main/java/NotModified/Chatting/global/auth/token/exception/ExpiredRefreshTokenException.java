package NotModified.Chatting.global.auth.token.exception;

public class ExpiredRefreshTokenException extends RuntimeException {
    public ExpiredRefreshTokenException() {
        super("리프레쉬 토큰이 만료되었습니다.");
    }
}
