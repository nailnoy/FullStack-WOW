package workoutwith.service;

import workoutwith.common.error.exception.ClubNotFoundException;
import workoutwith.common.error.exception.ReviewNotFoundException;
import workoutwith.common.error.exception.UserNotFoundException;
import workoutwith.controller.review.ReviewCreateRequestDto;
import workoutwith.controller.review.ReviewUpdateRequestDto;
import workoutwith.domain.*;
import workoutwith.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final ReviewCommentRepository reviewCommentRepository;
    private final S3Service s3Service;
    private final String imageUrl = "https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/02/25145253/Photo-by-Alfons-Morales-on-Unsplash-scaled-1535x900.jpg";

    //모임 생성, 수정할 때 시작일이 오늘 날짜보다 빠르면 예외처리 -> FE 측에서 처리??

    @Transactional
    public Review createReview(ReviewCreateRequestDto requestDto, MultipartFile file) {
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
        Review review = requestDto.toEntity();
        final Review newReview = convertToNewReview(review, requestDto.getUserId(), requestDto.getClubId());
        return reviewRepository.save(newReview);
    }

    //club 생성시에만 사용하는 메서드
    //파라미터로 받은 userId 값을 사용해 findById로 찾은 user 객체를 이용, 빌더로 entity 를 생성하는 역할
    private Review convertToNewReview(final Review review, final String userId, Long clubId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        final Club club = clubRepository.findById(clubId)
                .orElseThrow(ClubNotFoundException::new);
        return Review.builder()
                .user(user)
                .club(club)
                .contents(review.getContents())
                .imgUrl(review.getImgUrl())
                .build();
    }


    //검색 조회
    //param 으로 아예 tags 나 keyword 를 포함하지 않을 수도 있기 때문에 ==null 로 비교
    public List<Review> findAllReviews(String keyword) {

        //모든 모임 조회
        List<Review> reviews = reviewRepository.findAll();

        //keyword 필터링 -> clubs 항목들의 제목이 keyword 를 포함하고 있는가
        List<Review> reviewSortedByKeyword = new ArrayList<>();

        if (keyword.isEmpty())
        	reviewSortedByKeyword = reviews;
        else {
            for (Review review : reviews) {
                if (review.getContents().contains(keyword)) {
                	reviewSortedByKeyword.add(review);
                }
            }
        }

         return reviewSortedByKeyword.stream().sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                 .collect(Collectors.toList());

    }

    public Review findReviewById(Long clubId) {
    	Review review = reviewRepository.findById(clubId).orElseThrow(ReviewNotFoundException::new);
        return review;
    }

    public Review findReviewByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Review review = reviewRepository.findByUser(user).orElse(null);
        return review;
    }

    @Transactional
    public void updateReview(ReviewUpdateRequestDto requestDto, Long reviewId, MultipartFile file) {
        final Review review = findReviewById(reviewId);
        final Club club = clubRepository.findById(requestDto.getClubId())
                .orElseThrow(ClubNotFoundException::new);
        if (file != null) {
            try {
                String imgPath = s3Service.upload(file);
                requestDto.setImgUrl(imgPath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            requestDto.setImgUrl(review.getImgUrl());
        }
        review.updateReview(
        		club,
                requestDto.getContents(),
                requestDto.getImgUrl());
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        final Review review = findReviewById(reviewId);
        reviewCommentRepository.deleteAllByReview(review);
        reviewRepository.delete(review);
    }
}