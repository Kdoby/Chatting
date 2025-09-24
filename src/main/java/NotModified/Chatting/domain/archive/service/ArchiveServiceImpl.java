package NotModified.Chatting.domain.archive.service;

import NotModified.Chatting.domain.archive.dto.request.CreateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.request.UpdateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.response.ArchiveContentResponse;
import NotModified.Chatting.domain.archive.dto.response.ArchiveResponse;
import NotModified.Chatting.domain.archive.exception.ArchiveNotFoundException;
import NotModified.Chatting.domain.archive.exception.InvalidArchiveAccessException;
import NotModified.Chatting.domain.archive.exception.InvalidThumbnailInputException;
import NotModified.Chatting.domain.archive.model.Archive;
import NotModified.Chatting.domain.archive.model.ArchiveImage;
import NotModified.Chatting.domain.archive.repository.ArchiveImageRepository;
import NotModified.Chatting.domain.archive.repository.ArchiveRepository;
import NotModified.Chatting.domain.chat.exception.ChatImageNotFoundException;
import NotModified.Chatting.domain.chat.exception.InvalidChatImageAccessException;
import NotModified.Chatting.domain.chat.exception.InvalidChatRoomAccessException;
import NotModified.Chatting.domain.chat.model.ChatImage;
import NotModified.Chatting.domain.chat.model.ChatRoom;
import NotModified.Chatting.domain.chat.model.ChatRoomMember;
import NotModified.Chatting.domain.chat.repository.ChatImageRepository;
import NotModified.Chatting.domain.chat.repository.ChatRoomMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ArchiveServiceImpl implements ArchiveService {

    private final ArchiveRepository archiveRepository;
    private final ArchiveImageRepository archiveImageRepository;

    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatImageRepository chatImageRepository;

    public Archive findArchive(Long id) {

        return archiveRepository.findById(id)
                .orElseThrow(() -> new ArchiveNotFoundException(id));
    }

    @Override
    public void createArchive(Long userId, CreateArchiveRequest request) {

        // 채팅방 접근 권한 체크
        ChatRoomMember chatRoomMember = chatRoomMemberRepository.findByRoomAndMember(request.getRoomId(), userId)
                .orElseThrow(() -> new InvalidChatRoomAccessException(request.getRoomId(), userId));

        if (request.getThumbnailImageId() == null
                || !request.getImages().contains(request.getThumbnailImageId())) {
            throw new InvalidThumbnailInputException(request.getThumbnailImageId());
        }

        Archive archive = Archive.builder()
                .room(chatRoomMember.getRoom())
                .thumbnailId(request.getThumbnailImageId())
                .content(request.getContent())
                .build();

        archiveRepository.save(archive);

        List<ChatImage> images = chatImageRepository.findAllById(request.getImages());
        // 이미지 id + 이미지 객체 맵 생성
        // Function.identity(): 자기 자신을 반환(ChatImage)
        Map<Long, ChatImage> imgMap = images.stream()
                .collect(Collectors.toMap(ChatImage::getId, Function.identity()));

        for (Long imgId : request.getImages()) {

            ChatImage image = imgMap.get(imgId);
            // 1. 존재하지 않는 이미지 이거나,
            if (image == null) {
                throw new ChatImageNotFoundException(imgId);
            }

            // 2. 해당 채팅방에 속한 이미지가 아닌 경우
            if (!image.getRoom().getId().equals(request.getRoomId())) {
                throw new InvalidChatImageAccessException(request.getRoomId(), imgId);
            }

            archiveImageRepository.save(ArchiveImage.builder()
                    .archive(archive)
                    .image(image)
                    .isThumbnail(request.getThumbnailImageId().equals(imgId))
                    .build());
        }
    }

    @Override
    public void updateArchive(Long userId, UpdateArchiveRequest request) {

        Archive archive = findArchive(request.getArchiveId());

        chatRoomMemberRepository.findByRoomAndMember(archive.getRoom().getId(), userId)
                .orElseThrow(() -> new InvalidArchiveAccessException(userId, archive.getId()));

        archive.setContent(request.getContent());
    }

    @Override
    public List<ArchiveResponse> getArchivesInRoom(Long roomId, Long userId) {

        // 채팅방 접근 권한 체크
        chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new InvalidChatRoomAccessException(roomId, userId));

        List<ArchiveResponse> responses = new ArrayList<>();

        // 특정 채팅방의 아카이브 목록
        List<Archive> archives = archiveRepository.findByRoom_Id(roomId);
        List<Long> archiveIds = archives.stream()
                .map(Archive::getId)
                .toList();

        // (아카이브 id, 썸네일 이미지)
        List<ArchiveImage> archiveImages = archiveImageRepository.findByArchive_IdInAndIsThumbnail(archiveIds, true);
        Map<Long, ArchiveImage> archiveImageMap = archiveImages.stream()
                .collect(Collectors.toMap(
                        ai -> ai.getArchive().getId(),
                        Function.identity()
                ));

        for (Archive ar : archives) {

            responses.add(ArchiveResponse.builder()
                    .archiveId(ar.getId())
                    .content(ar.getContent())
                    .thumbnailImage("/uploads/" + archiveImageMap.get(ar.getId()).getImage().getStoredFileName())
                    .createdAt(ar.getCreatedAt())
                    .updatedAt(ar.getUpdatedAt())
                    .build());
        }

        return responses;
    }

    @Override
    public ArchiveContentResponse getArchiveContent(Long userId, Long archiveId) {

        Archive archive = findArchive(archiveId);

        chatRoomMemberRepository.findByRoomAndMember(archive.getRoom().getId(), userId)
                .orElseThrow(() -> new InvalidArchiveAccessException(userId, archiveId));

        List<ArchiveImage> images = archiveImageRepository.findByArchive(archive);
        Map<String, Boolean> archiveImages = images.stream()
                .collect(Collectors.toMap(
                        ai -> "/uploads/" + ai.getImage().getStoredFileName(), // key: 파일 저장 경로
                        ArchiveImage::getIsThumbnail)   // value: 썸네일 여부
                );

        return ArchiveContentResponse.builder()
                .archiveId(archiveId)
                .content(archive.getContent())
                .images(archiveImages)
                .createdAt(archive.getCreatedAt())
                .updatedAt(archive.getUpdatedAt())
                .build();
    }

    @Override
    public List<ArchiveResponse> getArchivesOfUser(Long userId) {

        List<ArchiveResponse> responses = new ArrayList<>();

        // 특정 사용자가 속한 채팅방 목록
        List<ChatRoom> rooms = chatRoomMemberRepository.findByMember_Id(userId).stream()
                .map(ChatRoomMember::getRoom)
                .toList();
        List<Long> roomIds = rooms.stream()
                .map(ChatRoom::getId)
                .toList();

        // 같은 채팅방에 속한 멤버 목록
        List<ChatRoomMember> allMembers = chatRoomMemberRepository.findAllByRoom_IdIn(roomIds);

        // (채팅방 id, 거기에 속한 멤버 닉네임 리스트) map
        Map<Long, List<String>> chatRoomMembersMap = allMembers.stream()
                .collect(Collectors.groupingBy(
                        m -> m.getRoom().getId(),
                        Collectors.mapping(
                                c -> c.getMember().getNickname(),
                                Collectors.toList())
                ));

        // 채팅방의 아카이브 목록들
        List<Archive> archives = archiveRepository.findAllByRoomIn(rooms);
        List<Long> thumbnailIds = archives.stream()
                .map(Archive::getThumbnailId)
                .toList();

        // 아카이브들의 썸네일 이미지 목록을 id와 맵핑
        Map<Long, ChatImage> chatImageMap = chatImageRepository.findAllById(thumbnailIds).stream()
                .collect(Collectors.toMap(ChatImage::getId, Function.identity()));

        for (Archive ar : archives) {

            responses.add(ArchiveResponse.builder()
                    .archiveId(ar.getId())
                    .content(ar.getContent())
                    // 썸네일 이미지를 Map 에서 찾아서 넣음
                    .thumbnailImage(chatImageMap.get(ar.getThumbnailId()).getStoredFileName())
                    .createdAt(ar.getCreatedAt())
                    .updatedAt(ar.getUpdatedAt())
                    .members(chatRoomMembersMap.get(ar.getRoom().getId()))
                    .build());
        }

        return responses;
    }
}
