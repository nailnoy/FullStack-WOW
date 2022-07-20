package workoutwith.controller.reviewcomment;

import workoutwith.domain.ReviewComment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReviewCommentResponseDto {

    private Long id;
    private Long reviewId;
    private String userId;
    private String userImgUrl;
    private String userName; // 유저 이름
    private LocalDateTime createdAt; // 생성 날짜
    private LocalDateTime updatedAt; // 생성 날짜
    private String contents; // 댓글

    public ReviewCommentResponseDto(ReviewComment comment) {
        BeanUtils.copyProperties(comment, this);
        this.reviewId = comment.getReview().getId();
        this.userId = comment.getUser().getId();
        this.userName = comment.getUser().getName();
        this.userImgUrl = comment.getUser().getImgUrl();
    }

}