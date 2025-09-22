package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class ChatImageNotFoundException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.CHATIMAGE_NOT_FOUND;
    private static final String MESSAGE_KEY = "exception.chatimage.notfound";

    public ChatImageNotFoundException(Long imageId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{imageId});
    }
}
