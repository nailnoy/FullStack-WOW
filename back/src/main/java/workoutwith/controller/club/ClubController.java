package workoutwith.controller.club;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;
import workoutwith.domain.Club;
import workoutwith.service.ClubService;

@RestController
@RequestMapping("/clubs")
@RequiredArgsConstructor
public class    ClubController {

    private final ClubService clubService;

    //모임 생성
    @ApiOperation(value="모임 생성", notes="모임 등록, 한 계정에 한 모임만 생성 가능")
    @ApiResponses({
    	@ApiResponse(code=200, message="저장 완료"),
    	@ApiResponse(code=404, message="Not Found"),
    	@ApiResponse(code=500, message="Internal Server Error")
    })
    @PostMapping
    public ResponseEntity<ClubCreateRequestDto> createClub(
            ClubCreateRequestDto clubCreateRequestDto,
             @ApiIgnore @RequestParam(value = "img", required = false) MultipartFile file) {
        //이 유저가 만든 독서모임이 있는지 체크(한사람당 한 개)
        //400 에러 -> 잘못된 요청
        if (clubService.findClubByUserId(clubCreateRequestDto.getUserId()) != null) {
            return new ResponseEntity("한 사람 당 하나의 운동모임만 생성할 수 있습니다.", HttpStatus.BAD_REQUEST);
        } else {
            Club club = clubService.createClub(clubCreateRequestDto, file);
            return new ResponseEntity("운동모임 등록이 완료되었습니다. (clubId: " + club.getId() + ")", HttpStatus.OK);
        }
    }

    //모임 리스트 조회
    @GetMapping
    public ResponseEntity<ClubPageResponseDto> getClubs(
            @RequestParam(value = "sortBy") String sortBy,
            @RequestParam(value = "tags") String tags,
            @RequestParam(value = "clubStatus") String clubStatus,
            @RequestParam(value = "keyword") String keyword,
            @PageableDefault(size = 9) Pageable pageable) {
        List<Club> allClubs = clubService.sortClubBySortBy(
                clubService.findAllClubs(tags, clubStatus, keyword), sortBy);
        //page=0부터 동작하는 게 default이지만, yml 설정을 통해 1부터 시작하게 할 수 있음. 그러나 여전히 0이어도 동작은 한다.
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allClubs.size());
        Page<Club> page = new PageImpl<>(allClubs.subList(start, end), pageable, allClubs.size());
        List<ClubResponseDto> clubResponseDtoList = page.stream()
                .map(ClubResponseDto::new)  //조회한 클럽 리스트 항목 하나하나를 ClubResponseDto와 매핑해 줌
                .collect(Collectors.toList());  //스트림에서 작업한 결과를 담은 리스트로 반환
        //Collectors.joining(delimeter, prefix, suffix)로 스트링으로 조합할 수 있음
        ClubPageResponseDto pageResponseDto = new ClubPageResponseDto((long) allClubs.size(), clubResponseDtoList);
        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }

    //모임 상세조회
    @GetMapping("/{clubId}")
    public ResponseEntity<ClubDetailResponseDto> getClubDetail(
            @PathVariable Long clubId) {
        return ResponseEntity.ok(
                new ClubDetailResponseDto(clubService.findClubById(clubId))
        );
    }

    //사용자가 만든 모임 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<ClubDetailResponseDto> getUserClub(
            @PathVariable String userId) {
        Club club = clubService.findClubByUserId(userId);
        if (club != null) {
            return ResponseEntity.ok(new ClubDetailResponseDto(club));
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // 모임 수정 (my page)
    @PutMapping("/users/{userId}")
    public ResponseEntity<Void> updateClub(
            ClubUpdateRequestDto clubUpdateRequestDto,
            @PathVariable String userId,
            @RequestParam(value = "img", required = false) MultipartFile file) {
        try {
            clubService.updateClub(clubUpdateRequestDto, userId, file);
            return new ResponseEntity("운동모임 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 모임 삭제 (my page)
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteClub(
            @PathVariable String userId) {
        clubService.deleteClub(userId);
        return new ResponseEntity("운동모임 삭제가 완료되었습니다.", HttpStatus.OK);
    }
    
    @GetMapping("/review")
    public ResponseEntity<ClubReviewResponseDto> getClubsForPost() {
    	List<Club> allClubs = clubService.findAllClubsForPost();
    	List<ClubResponseDto> clubResponseDtoList = allClubs.stream()
                 .map(ClubResponseDto::new)  //조회한 클럽 리스트 항목 하나하나를 ClubResponseDto와 매핑해 줌
                 .collect(Collectors.toList());
    	ClubReviewResponseDto reviewResponseDto = new ClubReviewResponseDto(clubResponseDtoList);
    	return new ResponseEntity<>(reviewResponseDto, HttpStatus.OK);
    }

}