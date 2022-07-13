package workoutwith.controller.likedclub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikedClubCreateRequestDto {
    private String userId;
    private Long clubId;
}