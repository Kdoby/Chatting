package NotModified.Chatting.domain.archive.model;

import NotModified.Chatting.domain.chat.model.ChatImage;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "archive_image")
public class ArchiveImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "archive_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "archive_id")
    private Archive archive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_image_id")
    private ChatImage image;

    @Column(name = "is_thumbnail")
    private Boolean isThumbnail;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
