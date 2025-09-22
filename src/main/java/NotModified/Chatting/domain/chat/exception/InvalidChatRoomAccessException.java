package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidChatRoomAccessException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_CHATROOM_ACCESS;
    private static final String MESSAGE_KEY = "exception.chatroom.access.invalid";

    public InvalidChatRoomAccessException(Long roomId, Long userId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{roomId, userId});
    }
}
