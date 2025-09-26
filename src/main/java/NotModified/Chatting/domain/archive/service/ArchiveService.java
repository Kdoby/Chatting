package NotModified.Chatting.domain.archive.service;

import NotModified.Chatting.domain.archive.dto.request.CreateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.request.UpdateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.response.ArchiveContentResponse;
import NotModified.Chatting.domain.archive.dto.response.ArchiveResponse;
import NotModified.Chatting.domain.chat.dto.response.ChatResponse;

import java.util.List;

public interface ArchiveService {

    /* 아카이브 생성 */
    ChatResponse createArchive(Long userId, CreateArchiveRequest request);

    /* 아카이브 수정 */
    void updateArchive(Long userId, UpdateArchiveRequest request);

    /* 특정 채팅방의 아카이브 목록 조회 */
    List<ArchiveResponse> getArchivesInRoom(Long roomId, Long userId);

    /* 특정 아카이브의 내용 조회 */
    ArchiveContentResponse getArchiveContent(Long userId, Long archiveId);
    
    /* 사용자가 속한 채팅방의 아카이브 목록 조회 */
    List<ArchiveResponse> getArchivesOfUser(Long userId);
}
