package NotModified.Chatting.global.util;

import org.springframework.security.access.AccessDeniedException;

public class SecurityUtil {

    public static void validateOwner(Long resourceOwnerUserId, Long currentUserId) {

        if(!resourceOwnerUserId.equals(currentUserId)) {
            throw new AccessDeniedException("접근 권한이 없습니다.");
        }
    }
}
