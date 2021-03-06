package workoutwith.controller.review;

import workoutwith.domain.Review;
import workoutwith.service.ReviewService;
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
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    //게시글 생성
    @PostMapping
    public ResponseEntity<ReviewCreateRequestDto> createReview(
            ReviewCreateRequestDto reviewCreateRequestDto,
            @RequestParam(value = "img", required = false) MultipartFile file) {
    	Review review = reviewService.createReview(reviewCreateRequestDto, file);
        return new ResponseEntity("게시글 등록이 완료되었습니다. (reviewId: " + review.getId() + ")", HttpStatus.OK);    
    }

    //게시글 리스트 조회
    @GetMapping
    public ResponseEntity<ReviewPageResponseDto> getReview(
            @RequestParam(value = "keyword") String keyword,
            @PageableDefault(size = 9) Pageable pageable) {
        List<Review> allReviews = reviewService.findAllReviews(keyword);
        //page=0부터 동작하는 게 default이지만, yml 설정을 통해 1부터 시작하게 할 수 있음. 그러나 여전히 0이어도 동작은 한다.
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allReviews.size());
        Page<Review> page = new PageImpl<>(allReviews.subList(start, end), pageable, allReviews.size());
        List<ReviewResponseDto> reviewResponseDtoList = page.stream()
                .map(ReviewResponseDto::new)  //조회한 클럽 리스트 항목 하나하나를 ClubResponseDto와 매핑해 줌
                .collect(Collectors.toList());  //스트림에서 작업한 결과를 담은 리스트로 반환
        //Collectors.joining(delimeter, prefix, suffix)로 스트링으로 조합할 수 있음
        ReviewPageResponseDto pageResponseDto = new ReviewPageResponseDto((long) allReviews.size(), reviewResponseDtoList);
        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }

    //게시글 상세조회
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDetailResponseDto> getReviewDetail(
            @PathVariable Long reviewId) {
        return ResponseEntity.ok(
                new ReviewDetailResponseDto(reviewService.findReviewById(reviewId))
        );
    }

    //사용자가 만든 게시글 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<ReviewDetailResponseDto> getUserReview(
            @PathVariable String userId) {
        Review review = reviewService.findReviewByUserId(userId);
        if (review != null) {
            return ResponseEntity.ok(new ReviewDetailResponseDto(review));
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // 모임 수정 (my page)
    @PutMapping("/{reviewId}")
    public ResponseEntity<Void> updateReview(
            ReviewUpdateRequestDto reviewUpdateRequestDto,
            @PathVariable Long reviewId,
            @RequestParam(value = "img", required = false) MultipartFile file) {
        try {
        	reviewService.updateReview(reviewUpdateRequestDto, reviewId, file);
            return new ResponseEntity("게시글 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 모임 삭제 (my page)
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId) {
    	reviewService.deleteReview(reviewId);
        return new ResponseEntity("게시글 삭제가 완료되었습니다.", HttpStatus.OK);
    }

}