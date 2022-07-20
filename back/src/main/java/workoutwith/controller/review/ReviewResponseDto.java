package workoutwith.controller.review;

import workoutwith.domain.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ReviewResponseDto {

    private Long id;                    //게시글 아이디
    private String contents;            //게시글 한줄소개
    private String imgUrl;              //게시글 썸네일 이미지
    private int likes;                  //게시글 좋아요 수


    public ReviewResponseDto(Review review) {
        BeanUtils.copyProperties(review, this);
    }
}
