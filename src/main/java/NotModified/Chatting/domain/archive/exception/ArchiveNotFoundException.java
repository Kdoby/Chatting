package NotModified.Chatting.domain.archive.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class ArchiveNotFoundException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.ARCHIVE_NOT_FOUND;
    private static final String MESSAGE_KEY = "exception.archive.notfound";

    public ArchiveNotFoundException(Long archiveId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{archiveId});
    }
}
