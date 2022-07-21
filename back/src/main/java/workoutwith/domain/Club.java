package workoutwith.domain;

import static javax.persistence.FetchType.LAZY;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@ToString(exclude = {"commentList", "memberList"})
@Table(name = "clubs")
@Getter

public class Club extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //데이터베이스에 위임(자동생성, auto_increment)
    //@Column(name = "club_id")
    private Long id;

    @JoinColumn(name = "user_id")
    @OneToOne(fetch = LAZY)
    private User user;

    @OneToMany(mappedBy = "club")
    private final List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "club")
    private final List<Member> memberList = new ArrayList<>();
    
    @OneToMany(mappedBy = "club")
    private final List<Review> reviewList = new ArrayList<>();

    @Column(length = 2000, nullable = false)
    @Size(max = 2000)
    private String description;

    @Column(nullable = false)
    private String title;

    @Lob
    private String imgUrl;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    private String tags;

    @Column(nullable = false)
    private int minPersonnel;

    @Column(nullable = false)
    private int maxPersonnel;

    private String addressDetail;

    private String addressStreet;

    @ApiModelProperty(example="1")
    private int likes;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @ApiModelProperty(example="ACTIVE")
    private ClubStatus clubStatus; // [ACTIVE, EXPIRED]

    @Builder
    public Club(User user, String title, String contents, String imgUrl, int minPersonnel, int maxPersonnel,
                LocalDate startDate, LocalDate endDate, String tags, int likes, String description,
                String addressDetail, String addressStreet, ClubStatus clubStatus) {
        this.user = user;
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
        this.minPersonnel = minPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tags = tags;
        this.likes = likes;
        this.description = description;
        this.addressDetail = addressDetail;
        this.addressStreet = addressStreet;
        this.clubStatus = clubStatus;
    }

    public void changeLikes(int likes) {
        this.likes = likes;
    }

    //TODO: 파라미터 줄이는 방법 구상
    public void updateClub(String title, String contents, String imgUrl,
                           int minPersonnel, int maxPersonnel,
                           LocalDate startDate, LocalDate endDate,
                           String tags, String description,
                           String addressDetail, String addressStreet) {
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
        this.minPersonnel = minPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tags = tags;
        this.description = description;
        this.addressDetail = addressDetail;
        this.addressStreet = addressStreet;
    }

    public void changeStatus(ClubStatus clubstatus) {
        this.clubStatus = clubstatus;
    }
}