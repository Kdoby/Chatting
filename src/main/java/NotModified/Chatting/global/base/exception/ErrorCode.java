package NotModified.Chatting.global.base.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Member
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "존재하지 않는 사용자입니다."),
    USER_INVALID(HttpStatus.BAD_REQUEST, "U002", "권한이 없는 사용자입니다."),

    // Friendship
    FRIENDSHIP_NOT_FOUND(HttpStatus.NOT_FOUND, "F001", "존재하지 않는 요청입니다."),
    INVALID_FRIENDSHIP_REQUEST(HttpStatus.BAD_REQUEST, "F002", "유효하지 않은 요청입니다."),
    INVALID_FRIENDSHIP_APPROVE(HttpStatus.UNAUTHORIZED, "F003", "해당 요청을 받은 사람만 수락할 수 있습니다."),

    // Chat
    CHATROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "C001", "존재하지 않는 채팅방입니다."),
    INVALID_CHATROOM_ACCESS(HttpStatus.UNAUTHORIZED, "C002", "해당 채팅방에 접근 권한이 없습니다."),
    INVALID_CHATROOM_INVITATION(HttpStatus.BAD_REQUEST, "C003", "친구인 사용자에게만 초대 요청을 보낼 수 있습니다."),
    INVALID_CHATIMAGE_ACCESS(HttpStatus.BAD_REQUEST, "C004", "해당 채팅방에 존재하는 이미지가 아닙니다."),
    CHATIMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "C005", "존재하지 않는 이미지입니다."),

    // File
    FILE_EMPTY(HttpStatus.BAD_REQUEST, "FI001", "업로드된 파일이 없습니다."),
    FILE_SAVE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "FI002", "파일 저장에 실패했습니다."),

    // Archive
    ARCHIVE_NOT_FOUND(HttpStatus.NOT_FOUND, "A001", "존재하지 않는 아카이브입니다."),
    INVALID_ARCHIVE_ACCESS(HttpStatus.UNAUTHORIZED, "A002", "해당 아카이브에 접근 권한이 없습니다."),
    INVALID_THUMBNAIL_INPUT(HttpStatus.BAD_REQUEST, "A003", "썸네일 이미지는 선택한 이미지들 중에서 하나를 택해야 합니다."),

    // WebSocket
    EXCEPTION_IN_WEBSOCKET(HttpStatus.UNAUTHORIZED, "W001", "웹 소켓 연결 중에 예외가 발생하였습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
    }