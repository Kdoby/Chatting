package NotModified.Chatting.domain.chat.exception;

import NotModified.Chatting.global.base.exception.ErrorCode;
import NotModified.Chatting.global.base.exception.ServiceException;

public class ChatRoomNotFoundException extends ServiceException {

    private static final ErrorCode ERROR_CODE = ErrorCode.CHATROOM_NOT_FOUND;
    private static final String MESSAGE_KEY = "exception.chatroom.notfound";

    public ChatRoomNotFoundException(Long roomId) {

        super(ERROR_CODE, MESSAGE_KEY, new Object[]{roomId});
    }
}
