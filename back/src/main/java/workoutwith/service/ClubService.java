package workoutwith.service;

import workoutwith.common.error.exception.ClubNotFoundException;
import workoutwith.common.error.exception.ReviewNotFoundException;
import workoutwith.common.error.exception.UserNotFoundException;
import workoutwith.controller.club.ClubCreateRequestDto;
import workoutwith.controller.club.ClubUpdateRequestDto;
import workoutwith.domain.*;
import workoutwith.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final LikedClubRepository likedClubRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewCommentRepository reviewCommentRepository;
    private final S3Service s3Service;
    private final String imageUrl = "https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg";

    //모임 생성, 수정할 때 시작일이 오늘 날짜보다 빠르면 예외처리 -> FE 측에서 처리??

    @Transactional
    public Club createClub(ClubCreateRequestDto requestDto, MultipartFile file) {
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
        Club club = requestDto.toEntity();
        String startDateString = requestDto.getStartDate();
        String endDateString = requestDto.getEndDate();
        LocalDate startDate = LocalDate.parse(startDateString, DateTimeFormatter.ISO_DATE);
        LocalDate endDate = LocalDate.parse(endDateString, DateTimeFormatter.ISO_DATE);
        final Club newClub = convertToNewClub(club, requestDto.getUserId(), startDate, endDate);
        return clubRepository.save(newClub);
    }

    //club 생성시에만 사용하는 메서드
    //파라미터로 받은 userId 값을 사용해 findById로 찾은 user 객체를 이용, 빌더로 entity 를 생성하는 역할
    private Club convertToNewClub(final Club club, final String userId,
                                  LocalDate startDate, LocalDate endDate) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return Club.builder()
                .user(user)
                .title(club.getTitle())
                .contents(club.getContents())
                .imgUrl(club.getImgUrl())
                .minPersonnel(club.getMinPersonnel())
                .maxPersonnel(club.getMaxPersonnel())
                .startDate(startDate)
                .endDate(endDate)
                .tags(club.getTags())
                .likes(0)
                .description(club.getDescription())
                .addressDetail(club.getAddressDetail())
                .addressStreet(club.getAddressStreet())
                .clubStatus(ClubStatus.ACTIVE)
                .build();
    }

    //모임 만료 처리 메서드
    private void changeClubStatus(Club club) {
        if (LocalDate.now().isAfter(club.getEndDate())) {
            club.changeStatus(ClubStatus.EXPIRED);
        } else club.changeStatus(ClubStatus.ACTIVE);
    }

    private void changeAllClubStatus() {
        List<Club> clubList = clubRepository.findAll();
        for (Club club : clubList) {
            changeClubStatus(club);
        }
    }

    //모임 검색조건 조회
    //param 으로 아예 tags 나 keyword 를 포함하지 않을 수도 있기 때문에 ==null 로 비교
    public List<Club> findAllClubs(String tags, String clubStatus, String keyword) {
        //클럽 모집 여부 상태 확인
        changeAllClubStatus();

        //모든 모임 조회
        List<Club> clubs = clubRepository.findAll();

        //모집중 만 필터링
        if (clubStatus.equals("true")) {
            clubs.removeIf(club -> club.getClubStatus().equals(ClubStatus.EXPIRED));
        }

        //tag 와 keyword 값 확인 -> 둘 다 없으면 sortBy만 적용해서 리턴
        if (tags.isEmpty() && keyword.isEmpty()) {
            return clubs;
        }

        //keyword 필터링 -> clubs 항목들의 제목이 keyword 를 포함하고 있는가
        List<Club> clubSortedByKeyword = new ArrayList<>();

        if (keyword.isEmpty())
            clubSortedByKeyword = clubs;
        else {
            for (Club club : clubs) {
                if (club.getTitle().contains(keyword)) {
                    clubSortedByKeyword.add(club);
                }
            }
        }

        if (tags.isEmpty())
            return clubSortedByKeyword;

        //tag 필터링
        Set<Club> clubSortedByTags = new HashSet<>();
        List<String> tag = Arrays.asList(tags.split(", "));
        for (Club club : clubSortedByKeyword) {
            List<String> originTag = Arrays.asList(club.getTags().split(", "));
            for (String tagString : tag) {
                if (originTag.contains(tagString))
                    clubSortedByTags.add(club);
            }
        }

        return new ArrayList<>(clubSortedByTags);
    }

    //정렬 메서드
    public List<Club> sortClubBySortBy(List<Club> clubs, String sortBy) {
        if(sortBy.equals("createdAt")){
            return clubs.stream().sorted(Comparator.comparing(Club::getCreatedAt).reversed())
                    .collect(Collectors.toList());
        } else {
            return clubs.stream().sorted(Comparator.comparing(Club::getLikes).reversed())
                    .collect(Collectors.toList());
        }
    }

    public Club findClubById(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        changeClubStatus(club);
        return club;
    }

    public Club findClubByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Club club = clubRepository.findByUser(user).orElse(null);
        if (club != null) {
            changeClubStatus(club);
        }
        return club;
    }

    @Transactional
    public void updateClub(ClubUpdateRequestDto requestDto, String userId, MultipartFile file) {
        final Club club = findClubByUserId(userId);
        if (file != null) {
            try {
                String imgPath = s3Service.upload(file);
                requestDto.setImgUrl(imgPath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            requestDto.setImgUrl(club.getImgUrl());
        }
        LocalDate startDate = LocalDate.parse(requestDto.getStartDate(), DateTimeFormatter.ISO_DATE);
        LocalDate endDate = LocalDate.parse(requestDto.getEndDate(), DateTimeFormatter.ISO_DATE);
        changeClubStatus(club);
        club.updateClub(requestDto.getTitle(),
                requestDto.getContents(),
                requestDto.getImgUrl(),
                requestDto.getMinPersonnel(),
                requestDto.getMaxPersonnel(),
                startDate,
                endDate,
                requestDto.getTags(),
                requestDto.getDescription(),
                requestDto.getAddressDetail(),
                requestDto.getAddressStreet());
    }

    @Transactional
    public void deleteClub(String userId) {
        final Club club = findClubByUserId(userId);
        Review review = reviewRepository.findByClub(club).orElse(null);
        commentRepository.deleteAllByClub(club);
        likedClubRepository.deleteByClub(club);
        memberRepository.deleteAllByClub(club);
        reviewCommentRepository.deleteAllByReview(review);
        reviewRepository.deleteAllByClub(club);
        clubRepository.delete(club);
    }
    
    @Transactional
    public List<Club> findAllClubsForPost() {
        return clubRepository.findAll();
    }
}