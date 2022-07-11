package workoutwith.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Size;

import static javax.persistence.FetchType.EAGER;

@Entity
@NoArgsConstructor
@ToString
@Getter
@Table(name = "comments")
public class Comment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "comment_id")
    private Long id;

    @JoinColumn(name = "club_id")
    @ManyToOne(fetch = EAGER)
    private Club club;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = EAGER)
    private User user;

    @Column(length = 500, nullable = false)
    @Size(max = 500)
    private String contents;

    // 댓글 수정 -> setter 역할 (변경감지 활용)
    public void changeComment(String newComment) {
        this.contents = newComment;
    }

    @Builder
    public Comment(Club club, User user, String contents) {
        this.club = club;
        this.user = user;
        this.contents = contents;
    }
}