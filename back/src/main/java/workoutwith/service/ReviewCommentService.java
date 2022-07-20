package workoutwith.service;

import workoutwith.common.error.exception.CommentNotFoundException;
import workoutwith.common.error.exception.ReviewNotFoundException;
import workoutwith.common.error.exception.UserNotFoundException;
import workoutwith.controller.reviewcomment.ReviewCommentCreateRequestDto;
import workoutwith.controller.reviewcomment.ReviewCommentUpdateRequestDto;
import workoutwith.domain.Review;
import workoutwith.domain.ReviewComment;
import workoutwith.domain.User;
import workoutwith.repository.ReviewCommentRepository;
import workoutwith.repository.ReviewRepository;
import workoutwith.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewCommentService {

    private final ReviewCommentRepository reviewCommentRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    // 댓글 작성
    @Transactional // readOnly = false (기본값)
    public ReviewComment createComment(ReviewCommentCreateRequestDto commentCreateRequestDto) {
    	ReviewComment comment = commentCreateRequestDto.toEntity();
        String userId = commentCreateRequestDto.getUserId();
        Long reviewId = commentCreateRequestDto.getReviewId();

        final ReviewComment newComment = convertToComment(comment, userId, reviewId);
        return reviewCommentRepository.save(newComment);
    }

    private ReviewComment convertToComment(final ReviewComment comment, final String userId, final Long reviewId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        final Review review = reviewRepository.findById(reviewId)
                .orElseThrow(ReviewNotFoundException::new);

        return ReviewComment.builder()
                .contents(comment.getContents())
                .review(review)
                .user(user)
                .build();
    }

    // 댓글 수정
    @Transactional
    public void updateComment(ReviewCommentUpdateRequestDto commentUpdateRequestDto, Long commentId) {
        String contents = commentUpdateRequestDto.getContents();
        final ReviewComment comment = reviewCommentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        comment.changeComment(contents);
    }

    @Transactional
    public void deleteComment(final Long commentId) {
        final ReviewComment comment = reviewCommentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        reviewCommentRepository.delete(comment);
    }

    public Page<ReviewComment> findAllReviewComments(Long reviewId, int page) {
        PageRequest pageRequest = PageRequest.of((page - 1), 5, Sort.by(Sort.Direction.DESC, "id"));
        return reviewCommentRepository.findAllByReviewId(reviewId, pageRequest);
    }

    public Page<ReviewComment> findAllUserComments(String userId, int page) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 10, Sort.by(Sort.Direction.DESC, "id"));
        return reviewCommentRepository.findAllByUser(user, pageRequest);
    }

    // 실제로 사용되지는 않음
    @Transactional
    public void deleteAll() {
    	reviewCommentRepository.deleteAll();
    }
}