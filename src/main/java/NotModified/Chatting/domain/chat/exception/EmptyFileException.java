package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class EmptyFileException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.FILE_EMPTY;
    private static final String MESSAGE_KEY = "exception.file.empty";

    public EmptyFileException() {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{});
    }
}
