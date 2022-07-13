package workoutwith.controller.post;

import workoutwith.domain.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class PostDetailResponseDto {

    private Long id;                    //게시글 아이디
    private String userId;              //게시글 생성자 아이디
    private String title;               //게시글 이름
    private String contents;            //게시글 한줄소개
    private String imgUrl;              //게시글 썸네일 이미지

    public PostDetailResponseDto(Post post) {
        BeanUtils.copyProperties(post, this);
        this.userId = post.getUser().getId();
    }
}