package NotModified.Chatting.domain.friendship.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidFriendshipRequestException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_FRIENDSHIP_REQUEST;
    private static final String MESSAGE_KEY = "exception.friendship.request.invalid";

    public InvalidFriendshipRequestException(Long requesterId, Long addresseeId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{requesterId, addresseeId});
    }
}
