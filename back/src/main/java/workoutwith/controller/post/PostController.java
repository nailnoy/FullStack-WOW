package workoutwith.controller.post;

import workoutwith.domain.Post;
import workoutwith.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class    PostController {

    private final PostService postService;

    //게시글 생성
    @PostMapping
    public ResponseEntity<PostCreateRequestDto> createPost(
            PostCreateRequestDto postCreateRequestDto,
            @RequestParam(value = "img", required = false) MultipartFile file) {
    	Post post = postService.createPost(postCreateRequestDto, file);
        return new ResponseEntity("게시글 등록이 완료되었습니다. (clubId: " + post.getId() + ")", HttpStatus.OK);    
    }

    //게시글 리스트 조회
    @GetMapping
    public ResponseEntity<PostPageResponseDto> getPosts(
            @RequestParam(value = "keyword") String keyword,
            @PageableDefault(size = 9) Pageable pageable) {
        List<Post> allPosts = postService.findAllPosts(keyword);
        //page=0부터 동작하는 게 default이지만, yml 설정을 통해 1부터 시작하게 할 수 있음. 그러나 여전히 0이어도 동작은 한다.
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allPosts.size());
        Page<Post> page = new PageImpl<>(allPosts.subList(start, end), pageable, allPosts.size());
        List<PostResponseDto> clubResponseDtoList = page.stream()
                .map(PostResponseDto::new)  //조회한 클럽 리스트 항목 하나하나를 ClubResponseDto와 매핑해 줌
                .collect(Collectors.toList());  //스트림에서 작업한 결과를 담은 리스트로 반환
        //Collectors.joining(delimeter, prefix, suffix)로 스트링으로 조합할 수 있음
        PostPageResponseDto pageResponseDto = new PostPageResponseDto((long) allPosts.size(), clubResponseDtoList);
        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }

    //게시글 상세조회
    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponseDto> getPostDetail(
            @PathVariable Long postId) {
        return ResponseEntity.ok(
                new PostDetailResponseDto(postService.findPostById(postId))
        );
    }

    //사용자가 만든 게시글 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<PostDetailResponseDto> getUserPost(
            @PathVariable String userId) {
        Post post = postService.findPostByUserId(userId);
        if (post != null) {
            return ResponseEntity.ok(new PostDetailResponseDto(post));
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // 모임 수정 (my page)
    @PutMapping("/users/{userId}")
    public ResponseEntity<Void> updateClub(
            PostUpdateRequestDto postUpdateRequestDto,
            @PathVariable String userId,
            @RequestParam(value = "img", required = false) MultipartFile file) {
        try {
            postService.updatePost(postUpdateRequestDto, userId, file);
            return new ResponseEntity("게시글 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 모임 삭제 (my page)
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteClub(
            @PathVariable String userId) {
        postService.deletePost(userId);
        return new ResponseEntity("게시글 삭제가 완료되었습니다.", HttpStatus.OK);
    }

}