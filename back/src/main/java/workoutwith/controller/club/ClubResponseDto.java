package workoutwith.controller.club;

import workoutwith.domain.Club;
import workoutwith.domain.ClubStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ClubResponseDto {

    private Long id;                    //모임 아이디
    private String title;               //모임 이름
    private String contents;            //모임 한줄소개
    private String imgUrl;              //모임 썸네일 이미지
    private LocalDate endDate;          //모임 시작일
    private String tags;                //모임 태그
    private int likes;                  //모임 좋아요 수
    private ClubStatus clubStatus;      //모임 모집여부

    public ClubResponseDto(Club club) {
        BeanUtils.copyProperties(club, this);
    }
}
