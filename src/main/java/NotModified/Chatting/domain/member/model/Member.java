package NotModified.Chatting.domain.member.model;

import NotModified.Chatting.domain.friendship.model.Friendship;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_expiry")
    private LocalDateTime refreshTokenExpiry;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // mappedBy: 나는 관계의 주인이 x
    // @JoinColumn 을 가진 쪽이 관계의 owner
    @OneToMany(mappedBy = "requester")
    private List<Friendship> sentFriendships = new ArrayList<>();

    @OneToMany(mappedBy = "addressee")
    private List<Friendship> receivedFriendships = new ArrayList<>();

    /*@OneToMany(mappedBy = "member")
    private List<ChatRoomMember> chatRoomMemberList = new ArrayList<>();*/
}
