package workoutwith.controller.post;

import workoutwith.domain.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCreateRequestDto {

    private String userId;
    private String title;
    private String contents;
    private String imgUrl;


    public Post toEntity() {
        return Post.builder()
                .title(title)
                .contents(contents)
                .imgUrl(imgUrl)
                .build();
    }
}