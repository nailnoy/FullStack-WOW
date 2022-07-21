package workoutwith.controller.review;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewUpdateRequestDto {

	private Long clubId;
    private String contents;
    private String imgUrl;
}