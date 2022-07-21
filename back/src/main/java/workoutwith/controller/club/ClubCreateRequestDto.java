package workoutwith.controller.club;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import workoutwith.domain.Club;

@Getter
@Setter
@NoArgsConstructor

@ApiModel(value="모임 생성 정보", description = "모임 생성 정보를 보유한 DTO Class")
public class ClubCreateRequestDto {

	@ApiModelProperty(value="유저 아이디(입력x, 구글 로그인시 자동 생성)", example="11")
    private String userId;
	
	@ApiModelProperty(value="제목", example="모집글")
    private String title;
	
	@ApiModelProperty(value="한줄 설명", example="한줄 설명")
    private String contents;
    
    @ApiModelProperty(value="이미지 url", example="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg")
    private String imgUrl;
    
    @ApiModelProperty(value="최소 인원", example="3")
    private int minPersonnel;
    
    @ApiModelProperty(value="최대 인원", example="4")
    private int maxPersonnel;
    
    @ApiModelProperty(value="시작일", example="2022-07-20")
    private String startDate;
    
    @ApiModelProperty(value="종료일", example="2022-07-22")
    private String endDate;
    
    @ApiModelProperty(value="태그명", example="조깅")
    private String tags;
    
    @ApiModelProperty(value="상세 설명", example="상세 설명")
    private String description;
    
    @ApiModelProperty(value="세부 주소", example="1층 플레이데이터")
    private String addressDetail;
    
    @ApiModelProperty(value="도로명 주소", example="서울시 서초구 효령로 355")
    private String addressStreet;

    public Club toEntity() {
        return Club.builder()
                .title(title)
                .contents(contents)
                .imgUrl(imgUrl)
                .minPersonnel(minPersonnel)
                .maxPersonnel(maxPersonnel)
                .tags(tags)
                .description(description)
                .addressDetail(addressDetail)
                .addressStreet(addressStreet)
                .build();
    }
}