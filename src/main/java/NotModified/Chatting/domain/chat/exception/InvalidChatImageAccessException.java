package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;


public class InvalidChatImageAccessException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_CHATIMAGE_ACCESS;
    private static final String MESSAGE_KEY = "exception.chatimage.access.invalid";

    public InvalidChatImageAccessException(Long roomId, Long imageId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{roomId, imageId});
    }
}
