package workoutwith.controller.reviewcomment;

import workoutwith.domain.Comment;
import workoutwith.domain.ReviewComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCommentCreateRequestDto {

    private String userId; // 유저 아이디
    private Long reviewId; // 모임 페이지 번호
    private String contents; // 댓글 내용

    // JSON -> Entity (DTO)
    public ReviewComment toEntity() {
        return ReviewComment.builder()
                .contents(contents)
                .build();
    }

}
