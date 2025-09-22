package NotModified.Chatting.domain.archive.repository;

import NotModified.Chatting.domain.archive.model.Archive;
import NotModified.Chatting.domain.archive.model.ArchiveImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArchiveImageRepository extends JpaRepository<ArchiveImage, Long> {

    /* 특정 아카이브에 속한 이미지 목록 조회 */
    List<ArchiveImage> findByArchive(Archive archive);

    /* 특정 아카이브의 썸네일 조회 */
    List<ArchiveImage> findByArchive_IdInAndIsThumbnail(List<Long> archiveIds, Boolean isThumbnail);
}
