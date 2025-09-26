package NotModified.Chatting.domain.ai.service;

import NotModified.Chatting.domain.ai.dto.request.CreateSummaryRequest;
import NotModified.Chatting.domain.ai.dto.response.SummaryResponse;
import NotModified.Chatting.domain.chat.exception.InvalidChatRoomAccessException;
import NotModified.Chatting.domain.chat.model.Chat;
import NotModified.Chatting.domain.chat.repository.ChatRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class SummaryService {

    private final ChatRepository chatRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiUrl = "http://localhost:8000/summarize";

    /* test 전용 */
    public String getSummary(String text) {

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

        return response.getBody().get("summary").toString();
    }

    public SummaryResponse getSummary(Long roomId, Long userId, CreateSummaryRequest request) {

        // 채팅방 접근 권한 검사
        chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new InvalidChatRoomAccessException(roomId, userId));

        List<Chat> chats = chatRepository.findAllByRoom_IdAndSendTimeBetween(roomId,
                request.getStart(), request.getEnd());

        StringBuilder text = new StringBuilder();
        for (Chat chat : chats) {

            text.append("[")
                    .append(chat.getSender().getNickname())
                    .append("] ")
                    .append(chat.getMessage())
                    .append("\n");
        }

        return getSummaryV2(text.toString());
    }

    public SummaryResponse getSummaryV2(String text) {

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

        String summary = response.getBody().get("summary").toString();

        return SummaryResponse.builder()
                .summary(summary)
                .build();
    }
}
