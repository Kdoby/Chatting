package NotModified.Chatting.global.auth.token.exception;

public class RefreshTokenNotFoundException extends RuntimeException {

    public RefreshTokenNotFoundException() {
        super("유효하지 않은 리프레쉬 토큰입니다.");
    }
}
