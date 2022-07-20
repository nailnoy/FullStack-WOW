package workoutwith.controller.review;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReviewPageResponseDto {
    private Long totalCount;
    private List<ReviewResponseDto> reviewList;

    public ReviewPageResponseDto(Long totalCount, List<ReviewResponseDto> review) {
        this.totalCount = totalCount;
        this.reviewList = reviewList;
    }
}
