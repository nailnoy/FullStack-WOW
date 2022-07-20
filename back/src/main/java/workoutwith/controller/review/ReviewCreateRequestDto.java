package workoutwith.controller.review;

import workoutwith.domain.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewCreateRequestDto {

    private String userId;
    private Long clubId;
    private String contents;
    private String imgUrl;


    public Review toEntity() {
        return Review.builder()
                .contents(contents)
                .imgUrl(imgUrl)
                .build();
    }
}