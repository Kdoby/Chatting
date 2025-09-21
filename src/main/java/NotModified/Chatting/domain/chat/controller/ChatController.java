package NotModified.Chatting.domain.chat.controller;

import NotModified.Chatting.domain.chat.dto.request.ChatRequest;
import NotModified.Chatting.domain.chat.dto.response.ChatImageResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;
import NotModified.Chatting.domain.chat.service.ChatService;
import NotModified.Chatting.global.auth.token.dto.jwt.JwtAuthentication;
import NotModified.Chatting.global.base.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/chat")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    /* 메시지 보내기 */
    @MessageMapping("/chat.send/{roomId}")
    public void sendMessage(
            @DestinationVariable("roomId") Long roomId,
            @Header("simpSessionAttributes") Map<String, Object> simpSessionAttributes,
            @Payload ChatRequest request
    ) {
        Long userId = (Long) simpSessionAttributes.get("userId");

        ChatResponse response = chatService.saveTextMessage(roomId, userId, request);

        messagingTemplate.convertAndSend("/sub/chat/room/" + roomId, response);
    }

    @GetMapping("/list/{roomId}")
    public ResponseEntity<ApiResponse<List<ChatResponse>>> getChatMessages(
            @PathVariable("roomId") Long roomId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        List<ChatResponse> response = chatService.getChatList(roomId, auth.userId());

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "이전 채팅 목록 불러오기 성공",
                        response
                )
        );
    }

    @PostMapping("/uploads/{roomId}")
    public ResponseEntity<ApiResponse<ChatResponse>> sendImageFiles(
            @PathVariable("roomId") Long roomId,
            @RequestParam("files") List<MultipartFile> files,
            @AuthenticationPrincipal JwtAuthentication auth
    ){
        ChatResponse response =
                chatService.saveImageMessage(roomId, auth.userId(), files);

        messagingTemplate.convertAndSend("/sub/chat/room/" + roomId, response);

        return ResponseEntity.ok().body(
                new ApiResponse<>(
                        "이미지 전송 성공",
                        response
                )
        );
    }

    @GetMapping("/images/{roomId}")
    public ResponseEntity<ApiResponse<List<ChatImageResponse>>> getImagesInChatRoom(
            @PathVariable("roomId") Long roomId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
       List<ChatImageResponse> response =
               chatService.getImagesInChatRoom(roomId, auth.userId());

       return ResponseEntity.ok().body(
               new ApiResponse<>(
                       "이미지 목록 조회 성공",
                       response
               )
       );
    }

}
