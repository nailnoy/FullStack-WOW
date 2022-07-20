package workoutwith.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ClubReviewResponseDto {
    private List<ClubResponseDto> clubList;

    public ClubReviewResponseDto(List<ClubResponseDto> clubList) {
        this.clubList = clubList;
    }
}
