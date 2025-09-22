package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class InvalidInvitationException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.INVALID_CHATROOM_INVITATION;
    private static final String MESSAGE_KEY = "exception.chatroom.invitation.invalid";

    public InvalidInvitationException(Long userId, Long participantId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{userId, participantId});
    }
}
