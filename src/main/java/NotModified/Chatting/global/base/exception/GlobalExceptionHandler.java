package NotModified.Chatting.global.base.exception;

import NotModified.Chatting.global.base.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String EXCEPTION_FORMAT = "[EXCEPTION]         -----> ";
    private static final String EXCEPTION_MESSAGE_FORMAT = "[EXCEPTION] EXCEPTION_MESSAGE -----> [{}]";
    private static final String EXCEPTION_TYPE_FORMAT = "[EXCEPTION] EXCEPTION_TYPE     -----> [{}]";
    private static final String EXCEPTION_REQUEST_URI = "[EXCEPTION] REQUEST_URI        -----> [{}]";
    private static final String EXCEPTION_HTTP_METHOD_TYPE = "[EXCEPTION] HTTP_METHOD_TYPE      ----->[{}]";


    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponse> handleServiceException(HttpServletRequest request, ServiceException e) {

        ErrorCode errorCode = e.getErrorCode();

        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse.of(errorCode));
    }
}
