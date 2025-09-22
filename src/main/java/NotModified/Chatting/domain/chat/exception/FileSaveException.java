package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class FileSaveException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.FILE_SAVE_FAILED;
    private static final String MESSAGE_KEY = "exception.file.save";

    public FileSaveException(String fileName) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{fileName});
    }
}
