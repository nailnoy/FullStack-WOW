package workoutwith.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@ToString(exclude = {"commentList"})
@Table(name = "posts")
@Getter
public class Post extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //데이터베이스에 위임(자동생성, auto_increment)
    //@Column(name = "club_id")
    private Long id;

    @JoinColumn(name = "user_id")
    @OneToOne(fetch = LAZY)
    private User user;

    @OneToMany(mappedBy = "post")
    private final List<PostComment> commentList = new ArrayList<>();

    @Column(nullable = false)
    private String title;

    @Lob
    private String imgUrl;

    @Column(nullable = false)
    private String contents;

    private int likes;

    @Builder
    public Post(User user, String title, String contents, String imgUrl, int likes) {
        this.user = user;
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
        this.likes = likes;
    }

    public void changeLikes(int likes) {
        this.likes = likes;
    }

    //TODO: 파라미터 줄이는 방법 구상
    public void updateClub(String title, String contents, String imgUrl) {
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
    }
}