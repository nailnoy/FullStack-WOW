package workoutwith.repository;

import workoutwith.domain.Club;
import workoutwith.domain.Comment;
import workoutwith.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    void deleteAllByClub(Club club);

    Page<Comment> findAllByUser(User user, Pageable pageable);

    Page<Comment> findAllByClubId(Long clubId, Pageable pageable);
}
