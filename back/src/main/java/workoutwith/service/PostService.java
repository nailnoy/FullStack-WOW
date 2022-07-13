package workoutwith.service;

import workoutwith.common.error.exception.ClubNotFoundException;
import workoutwith.common.error.exception.UserNotFoundException;
import workoutwith.controller.post.PostCreateRequestDto;
import workoutwith.controller.post.PostUpdateRequestDto;
import workoutwith.domain.*;
import workoutwith.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostCommentRepository postCommentRepository;
    private final S3Service s3Service;
    private final String imageUrl = "https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/02/25145253/Photo-by-Alfons-Morales-on-Unsplash-scaled-1535x900.jpg";

    //독서모임 생성, 수정할 때 시작일이 오늘 날짜보다 빠르면 예외처리 -> FE 측에서 처리??

    @Transactional
    public Post createPost(PostCreateRequestDto requestDto, MultipartFile file) {
        if (file != null) {
            try {
                String imgPath = s3Service.upload(file);
                requestDto.setImgUrl(imgPath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else{
            requestDto.setImgUrl(imageUrl);
        }
        Post post = requestDto.toEntity();
        final Post newPost = convertToNewPost(post, requestDto.getUserId());
        return postRepository.save(newPost);
    }

    //club 생성시에만 사용하는 메서드
    //파라미터로 받은 userId 값을 사용해 findById로 찾은 user 객체를 이용, 빌더로 entity 를 생성하는 역할
    private Post convertToNewPost(final Post post, final String userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return Post.builder()
                .user(user)
                .title(post.getTitle())
                .contents(post.getContents())
                .imgUrl(post.getImgUrl())
                .build();
    }


    //검색 조회
    //param 으로 아예 tags 나 keyword 를 포함하지 않을 수도 있기 때문에 ==null 로 비교
    public List<Post> findAllPosts(String keyword) {

        //모든 모임 조회
        List<Post> posts = postRepository.findAll();

        //keyword 필터링 -> clubs 항목들의 제목이 keyword 를 포함하고 있는가
        List<Post> postSortedByKeyword = new ArrayList<>();

        if (keyword.isEmpty())
            postSortedByKeyword = posts;
        else {
            for (Post post : posts) {
                if (post.getTitle().contains(keyword)) {
                	postSortedByKeyword.add(post);
                }
            }
        }

         return postSortedByKeyword;

    }

    public Post findPostById(Long clubId) {
    	Post post = postRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        return post;
    }

    public Post findPostByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Post post = postRepository.findByUser(user).orElse(null);
        return post;
    }

    @Transactional
    public void updatePost(PostUpdateRequestDto requestDto, String userId, MultipartFile file) {
        final Post post = findPostByUserId(userId);
        if (file != null) {
            try {
                String imgPath = s3Service.upload(file);
                requestDto.setImgUrl(imgPath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            requestDto.setImgUrl(post.getImgUrl());
        }
        post.updateClub(requestDto.getTitle(),
                requestDto.getContents(),
                requestDto.getImgUrl());
    }

    @Transactional
    public void deletePost(String userId) {
        final Post post = findPostByUserId(userId);
        postCommentRepository.deleteAllByPost(post);
        postRepository.delete(post);
    }
}