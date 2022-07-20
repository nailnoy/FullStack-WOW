package workoutwith.controller.reviewcomment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReviewCommentPageResponseDto {

    private Long totalCount;
    private List<ReviewCommentResponseDto> commentList;

    public ReviewCommentPageResponseDto(Long totalCount, List<ReviewCommentResponseDto> commentList) {
        this.totalCount = totalCount;
        this.commentList = commentList;
    }
}
