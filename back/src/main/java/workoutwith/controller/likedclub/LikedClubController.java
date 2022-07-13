package workoutwith.controller.likedclub;

import workoutwith.domain.LikedClub;
import workoutwith.service.LikedClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likedClubs")
public class LikedClubController {

    private final LikedClubService likedClubService;

    @PostMapping
    public ResponseEntity<LikedClubResponseDto> createLikedClub(
            @RequestBody LikedClubCreateRequestDto likedClubRequestDto) {
        try {
            LikedClub likedClub = likedClubService.createLikedClub(likedClubRequestDto);
            return new ResponseEntity(
                    "좋아요한 독서모임에 등록되었습니다. (likedClubId: " + likedClub.getId() + ")", HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity("이미 등록된 좋아요한 독서모임 입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteLikedClub(
            @RequestParam("clubId") Long clubId,
            @RequestParam("userId") String userId) {
        likedClubService.deleteLikedClub(clubId, userId);
        return new ResponseEntity(
                "좋아요한 독서모임에서 삭제되었습니다.", HttpStatus.OK
        );
    }

    // 사용자가 등록한 좋아요 모임 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<LikedClubPageResponseDto> getUserLikedClubs(
            @PathVariable("userId") String userId,
            @RequestParam("page") int page) {
        Page<LikedClub> allUserLikedClubs = likedClubService.findAllUserLikedClubs(userId, page);
        Long totalCount = allUserLikedClubs.getTotalElements();
        List<LikedClubResponseDto> response = allUserLikedClubs
                .stream()
                .map(LikedClubResponseDto::new)
                .collect(Collectors.toList());
        LikedClubPageResponseDto likedClubPageResponseDto = new LikedClubPageResponseDto(totalCount, response);
        return new ResponseEntity(likedClubPageResponseDto, HttpStatus.OK);
    }

    // 사용자가 등록한 좋아요한 독서모임 아이디 조회 (FE 요청으로 추가적으로 만든 api)
    @GetMapping("/ids")
    public ResponseEntity<LikedClubIdListResponseDto> getUserLikedClubIds(
            @RequestParam("userId") String userId) {
        List<Long> likedClubIdList = likedClubService.getLikedClubIds(userId);
        LikedClubIdListResponseDto responseDto = new LikedClubIdListResponseDto(likedClubIdList);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

}