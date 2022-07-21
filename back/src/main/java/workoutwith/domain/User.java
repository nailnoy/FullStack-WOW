package workoutwith.domain;

import static javax.persistence.FetchType.LAZY;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor //파라미터 x 생성자 자동 생성
@ToString(exclude = {"club", "memberList", "likedClubList", "commentList"})
@Table(name = "users")
@Getter
public class User {

    @Id
    //@Column(name = "user_id")
    private String id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String email;

    @Column(length = 500, nullable = false)
    private String imgUrl;

    @OneToOne(mappedBy = "user", fetch = LAZY)
    private Club club; // 내가 만든 모임
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthorityStatus authority;
    
    @Column
    private int declaration;

    @OneToMany(mappedBy = "user")
    private final List<Member> memberList = new ArrayList<>();

    @OneToMany(mappedBy = "user") // 내가 좋아요한 모임
    private final List<LikedClub> likedClubList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<Comment> commentList = new ArrayList<>();
    
    @OneToMany(mappedBy = "user")
    private final List<Review> postList = new ArrayList<>();
    
    @OneToMany(mappedBy = "user")
    private final List<ReviewComment> postCommentList = new ArrayList<>();

    @Builder //생성자에 @Builder 를 설정하게되면 해당 생성자를 사용하는 Builder 가 생성되어 의미있는 객체만 생성할 수 있음
    public User(final String id, final String name, final String email, final String imgUrl, AuthorityStatus authority) {   //변수에 final -> 이 변수는 수정 불가
        this.id = id;
        this.name = name;
        this.email = email;
        this.imgUrl = imgUrl;
        this.authority = authority;
    }
    
    public void reportUser(AuthorityStatus authority, int declaration) {   //변수에 final -> 이 변수는 수정 불가
        this.authority = authority;
        this.declaration = declaration;
    }
}
