package NotModified.Chatting.global.auth.token.exception;

public class NotFoundCookieException extends RuntimeException {
    public NotFoundCookieException() {
        super("존재하지 않는 사용자입니다.");
    }
}
