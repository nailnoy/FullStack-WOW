package workoutwith.repository;

import workoutwith.domain.Club;
import workoutwith.domain.Review;
import workoutwith.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByUser(User user);
    
    Optional<Review> findByClub(Club club);
    
    void deleteAllByClub(Club club);
}