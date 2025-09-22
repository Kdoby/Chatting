package NotModified.Chatting.domain.archive.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidArchiveAccessException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_ARCHIVE_ACCESS;
    private static final String MESSAGE_KEY = "exception.archive.access.invalid";

    public InvalidArchiveAccessException(Long userId, Long archiveId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{userId, archiveId});
    }
}
