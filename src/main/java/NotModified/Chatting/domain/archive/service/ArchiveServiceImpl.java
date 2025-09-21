package NotModified.Chatting.domain.archive.service;

import NotModified.Chatting.domain.archive.dto.request.CreateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.request.UpdateArchiveRequest;
import NotModified.Chatting.domain.archive.dto.response.ArchiveContentResponse;
import NotModified.Chatting.domain.archive.dto.response.ArchiveResponse;
import NotModified.Chatting.domain.archive.model.Archive;
import NotModified.Chatting.domain.archive.model.ArchiveImage;
import NotModified.Chatting.domain.archive.repository.ArchiveImageRepository;
import NotModified.Chatting.domain.archive.repository.ArchiveRepository;
import NotModified.Chatting.domain.chat.model.ChatImage;
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

    @Override
    public void createArchive(Long userId, CreateArchiveRequest request) {

        ChatRoomMember chatRoomMember = chatRoomMemberRepository.findByRoomAndMember(request.getRoomId(), userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아카이브의 생성 권한이 없습니다."));

        Archive archive = Archive.builder()
                .room(chatRoomMember.getRoom())
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
            if (image == null) {
                throw new IllegalArgumentException("존재하지 않는 이미지입니다.");
            }

            if(!image.getRoom().getId().equals(request.getRoomId())) {
                throw new IllegalArgumentException("해당 채팅방에 속한 이미지가 아닙니다.");
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

        Archive archive = archiveRepository.findById(request.getArchiveId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아카이브입니다."));

        chatRoomMemberRepository.findByRoomAndMember(archive.getRoom().getId(), userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아카이브의 수정 권한이 없습니다."));

        archive.setContent(request.getContent());
    }

    @Override
    public List<ArchiveResponse> getArchivesInRoom(Long roomId, Long userId) {

        chatRoomMemberRepository.findByRoomAndMember(roomId, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아카이브의 열람 권한이 없습니다."));

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

        for(Archive ar : archives) {

            responses.add(ArchiveResponse.builder()
                    .archiveId(ar.getId())
                    .content(ar.getContent())
                    .thumbnailImage("/uploads/" + archiveImageMap.get(ar.getId()).getImage().getStoredFileName())
                    .build());
        }

        return responses;
    }

    @Override
    public ArchiveContentResponse getArchiveContent(Long userId, Long archiveId) {

        Archive archive = archiveRepository.findById(archiveId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아카이브입니다."));

        chatRoomMemberRepository.findByRoomAndMember(archive.getRoom().getId(), userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아카이브의 열람 권한이 없습니다."));

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

}
