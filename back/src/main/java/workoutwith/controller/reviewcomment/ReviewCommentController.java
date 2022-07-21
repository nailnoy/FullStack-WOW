package workoutwith.controller.reviewcomment;

import workoutwith.domain.ReviewComment;
import workoutwith.service.ReviewCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviewcomments")
public class ReviewCommentController {

    private final ReviewCommentService reviewCommentService;

    // 댓글 등록
    @PostMapping
    public ResponseEntity<ReviewCommentResponseDto> createComment(
            @RequestBody ReviewCommentCreateRequestDto commentCreateRequestDto) {
    	ReviewComment comment = reviewCommentService.createComment(commentCreateRequestDto);
        return new ResponseEntity(
                "댓글이 등록되었습니다. (commentId: " + comment.getId() + ")",
                HttpStatus.OK
        );
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(
            @RequestBody ReviewCommentUpdateRequestDto commentUpdateRequestDto,
            @PathVariable("commentId") Long commentId) {
    	reviewCommentService.updateComment(commentUpdateRequestDto, commentId);

        return new ResponseEntity(
                "댓글이 수정되었습니다. (commentId: " + commentId + ")",
                HttpStatus.OK
        );

    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable("commentId") Long commentId) {
    	reviewCommentService.deleteComment(commentId);
        return new ResponseEntity(
                "댓글이 삭제되었습니다. (commentId: " + commentId + ")",
                HttpStatus.OK
        );
    }

    // 모임상세 댓글 전체 조회
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewCommentPageResponseDto> getClubComments(
            @PathVariable("reviewId") Long reviewId, @RequestParam("page") int page) {
        Page<ReviewComment> allReviewComments = reviewCommentService.findAllReviewComments(reviewId, page);
        Long totalCount = allReviewComments.getTotalElements();
        List<ReviewCommentResponseDto> response = allReviewComments
                .stream()
                .map(ReviewCommentResponseDto::new)
                .collect(Collectors.toList());
        ReviewCommentPageResponseDto pageResponseDto = new ReviewCommentPageResponseDto(totalCount, response);
        return new ResponseEntity(pageResponseDto, HttpStatus.OK);
    }

    // 사용자 댓글 전체 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<ReviewCommentPageResponseDto> getUserComments(
            @PathVariable("userId") String userId, @RequestParam("page") int page) {
        Page<ReviewComment> allReviewComments = reviewCommentService.findAllUserComments(userId, page);
        Long totalCount = allReviewComments.getTotalElements();
        List<ReviewCommentResponseDto> response = allReviewComments
                .stream()
                .map(ReviewCommentResponseDto::new)
                .collect(Collectors.toList());
        ReviewCommentPageResponseDto pageResponseDto = new ReviewCommentPageResponseDto(totalCount, response);
        return new ResponseEntity(pageResponseDto, HttpStatus.OK);
    }
}
