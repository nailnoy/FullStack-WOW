package workoutwith.controller.review;

import workoutwith.domain.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDetailResponseDto {

    private Long id;                    //게시글 아이디
    private String userId;              //게시글 생성자 아이디
    private Long clubId;
    private String contents;            //게시글 한줄소개
    private String imgUrl;              //게시글 썸네일 이미지

    public ReviewDetailResponseDto(Review review) {
        BeanUtils.copyProperties(review, this);
        this.userId = review.getUser().getId();
        this.clubId = review.getClub().getId();
    }
}