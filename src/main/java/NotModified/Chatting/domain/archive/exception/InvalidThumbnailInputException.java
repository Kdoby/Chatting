package NotModified.Chatting.domain.archive.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidThumbnailInputException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_THUMBNAIL_INPUT;
    private static final String MESSAGE_KEY = "exception.archive.input.invalid";

    public InvalidThumbnailInputException(Long thumbnailId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{thumbnailId});
    }
}
