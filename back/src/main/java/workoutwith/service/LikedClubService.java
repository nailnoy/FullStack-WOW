package workoutwith.service;

import workoutwith.common.error.exception.ClubNotFoundException;
import workoutwith.common.error.exception.LikedClubNotFoundException;
import workoutwith.common.error.exception.UserNotFoundException;
import workoutwith.controller.likedclub.LikedClubCreateRequestDto;
import workoutwith.domain.Club;
import workoutwith.domain.LikedClub;
import workoutwith.domain.User;
import workoutwith.repository.ClubRepository;
import workoutwith.repository.LikedClubRepository;
import workoutwith.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikedClubService {
    private final LikedClubRepository likedClubRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;

    @Transactional
    public LikedClub createLikedClub(LikedClubCreateRequestDto likedClubRequestDto) {
        final User user = userRepository.findById(likedClubRequestDto.getUserId())
                .orElseThrow(UserNotFoundException::new);
        final Club club = clubRepository.findById(likedClubRequestDto.getClubId())
                .orElseThrow(ClubNotFoundException::new);

        if (likedClubRepository.findByClubAndUser(club, user).isPresent()) {
            return null;
        }

        club.changeLikes(club.getLikes() + 1); // 좋아요 버튼 클릭된 상태

        LikedClub postLikedClub = LikedClub.builder()
                .user(user)
                .club(club)
                .build();

        return likedClubRepository.save(postLikedClub);
    }

    @Transactional
    public void deleteLikedClub(Long clubId, String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Club club = clubRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        LikedClub likedClub = likedClubRepository.findByClubAndUser(club, user).orElseThrow(LikedClubNotFoundException::new);

        club.changeLikes(club.getLikes() - 1); // 좋아요 취소

        likedClubRepository.delete(likedClub);
    }

    @Transactional(readOnly = true)
    public Page<LikedClub> findAllUserLikedClubs(String userId, int page) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 9, Sort.by(Sort.Direction.DESC, "id"));
        return likedClubRepository.findAllByUser(user, pageRequest);
    }

    @Transactional(readOnly = true)
    public List<Long> getLikedClubIds(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<LikedClub> likedClubList = likedClubRepository.findAllByUser(user);
        List<Long> likedClubIdList = new ArrayList<>();
        for (LikedClub likedClub : likedClubList) {
            likedClubIdList.add(likedClub.getClub().getId());
        }
        return likedClubIdList;
    }
}