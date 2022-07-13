package workoutwith.repository;

import workoutwith.domain.ApprovalStatus;
import workoutwith.domain.Club;
import workoutwith.domain.Member;
import workoutwith.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserAndClub(User user, Club club);

    Page<Member> findByClubAndApprovalStatus(Club club, ApprovalStatus approvalStatus, Pageable pageable);

    Page<Member> findAllByUser(User user, Pageable pageable);

    List<Member> findAllByUser(User user);

    void deleteAllByClub(Club club);
}
