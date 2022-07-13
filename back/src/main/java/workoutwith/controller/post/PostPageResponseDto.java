package workoutwith.controller.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostPageResponseDto {
    private Long totalCount;
    private List<PostResponseDto> postList;

    public PostPageResponseDto(Long totalCount, List<PostResponseDto> postList) {
        this.totalCount = totalCount;
        this.postList = postList;
    }
}
