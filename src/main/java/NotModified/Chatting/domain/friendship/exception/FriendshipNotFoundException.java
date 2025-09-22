package NotModified.Chatting.domain.friendship.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class FriendshipNotFoundException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.FRIENDSHIP_NOT_FOUND;
    private static final String MESSAGE_KEY = "exception.friendship.notfound";

    public FriendshipNotFoundException(Long friendshipId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{friendshipId});
    }
}
