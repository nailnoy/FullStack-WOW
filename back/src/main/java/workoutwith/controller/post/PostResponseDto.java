package workoutwith.controller.post;

import workoutwith.domain.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {

    private Long id;                    //게시글 아이디
    private String title;               //게시글 이름
    private String contents;            //게시글 한줄소개
    private String imgUrl;              //게시글 썸네일 이미지
    private int likes;                  //게시글 좋아요 수


    public PostResponseDto(Post post) {
        BeanUtils.copyProperties(post, this);
    }
}
