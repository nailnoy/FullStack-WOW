package workoutwith.repository;

import workoutwith.domain.Review;
import workoutwith.domain.ReviewComment;
import workoutwith.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewCommentRepository extends JpaRepository<ReviewComment, Long> {

    void deleteAllByReview(Review review);

    Page<ReviewComment> findAllByUser(User user, Pageable pageable);

    Page<ReviewComment> findAllByReviewId(Long reviewId, Pageable pageable);
}
