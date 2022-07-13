package workoutwith.controller.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostUpdateRequestDto {

    private String title;
    private String contents;
    private String imgUrl;
    private String tags;
}