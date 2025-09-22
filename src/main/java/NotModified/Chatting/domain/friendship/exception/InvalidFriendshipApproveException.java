package NotModified.Chatting.domain.friendship.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidFriendshipApproveException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_FRIENDSHIP_APPROVE;
    private static final String MESSAGE_KEY = "exception.friendship.approve.invalid";

    public InvalidFriendshipApproveException(Long friendshipId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{friendshipId});
    }
}
