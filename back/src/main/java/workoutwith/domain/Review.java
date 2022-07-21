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

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@ToString(exclude = {"commentList"})
@Table(name = "reviews")
@Getter
public class Review extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //데이터베이스에 위임(자동생성, auto_increment)
    private Long id;

    @JoinColumn(name = "user_id")
    @OneToOne(fetch = EAGER)
    private User user;
    
    @JoinColumn(name = "club_id")
    @ManyToOne(fetch = EAGER)
    private Club club;

    @OneToMany(mappedBy = "review")
    private final List<ReviewComment> commentList = new ArrayList<>();

    @Lob
    private String imgUrl;

    @Column(nullable = false)
    private String contents;


    @Builder
    public Review(User user, Club club, String title, String contents, String imgUrl, int likes) {
        this.user = user;
        this.club = club;
        this.contents = contents;
        this.imgUrl = imgUrl;
    }

    //TODO: 파라미터 줄이는 방법 구상
    public void updateReview(Club club, String contents, String imgUrl) {
        this.club = club;
    	this.contents = contents;
        this.imgUrl = imgUrl;
    }
}