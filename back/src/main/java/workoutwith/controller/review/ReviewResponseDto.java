package workoutwith.controller.review;

import workoutwith.domain.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ReviewResponseDto {

    private Long id;                    //게시글 아이디
    private String userId;
    private Long clubId;
    private String userImgUrl;
    private String userName; // 유저 이름
    private String contents;            //게시글 한줄소개
    private String imgUrl;              //게시글 썸네일 이미지
    private LocalDateTime createdAt; // 생성 날짜
    private int likes;                  //게시글 좋아요 수


    public ReviewResponseDto(Review review) {
        BeanUtils.copyProperties(review, this);
        this.clubId = review.getClub().getId();
        this.userId = review.getUser().getId();
        this.userName = review.getUser().getName();
        this.userImgUrl = review.getUser().getImgUrl();
    }
    
}
