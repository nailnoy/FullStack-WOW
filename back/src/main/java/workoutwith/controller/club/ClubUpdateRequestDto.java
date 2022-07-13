package workoutwith.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClubUpdateRequestDto {

    private String title;
    private String contents;
    private String imgUrl;
    private int minPersonnel;
    private int maxPersonnel;
    private String startDate;
    private String endDate;
    private String tags;
    private String description;
    private String addressDetail;
    private String addressStreet;
}