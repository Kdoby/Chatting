package NotModified.Chatting.global.base.dto;

public record ApiResponse<T> (String message, T data) {

    public ApiResponse(T data) {
        this("성공", data);
    }
}
