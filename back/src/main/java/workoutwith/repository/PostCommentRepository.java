package workoutwith.repository;

import workoutwith.domain.Post;
import workoutwith.domain.PostComment;
import workoutwith.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    void deleteAllByPost(Post post);

    Page<PostComment> findAllByUser(User user, Pageable pageable);

    Page<PostComment> findAllByPostId(Long postId, Pageable pageable);
}
