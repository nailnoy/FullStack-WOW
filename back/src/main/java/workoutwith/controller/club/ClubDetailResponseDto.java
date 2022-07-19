package workoutwith.controller.club;

import workoutwith.domain.Club;
import workoutwith.domain.ClubStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ClubDetailResponseDto {

    private Long id;                    //모임 아이디
    private String userId;              //모임 생성자 아이디
    private String title;               //모임 이름
    private String contents;            //모임 한줄소개
    private String imgUrl;              //모임 썸네일 이미지
    private int minPersonnel;           //모임 최소인원
    private int maxPersonnel;           //모임 최대인원
    private LocalDate startDate;        //모임 시작일
    private LocalDate endDate;          //모임 종료일
    private String tags;                //모임 태그
    private int likes;                  //모임 좋아요 수
    private String description;         //모임 상세설명
    private String addressDetail;       //모임 위치 상세주소
    private String addressStreet;       //모임 위치 도로명주소
    private ClubStatus clubStatus;      //모임 모집여부
    private LocalDateTime createdAt;

    public ClubDetailResponseDto(Club club) {
        BeanUtils.copyProperties(club, this);
        this.userId = club.getUser().getId();
    }
}