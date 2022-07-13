package workoutwith.controller.user;

import workoutwith.domain.User;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequestDto {

    private String id;
    private String name;
    private String email;
    private String imgUrl;

    public User toEntity() {
        return User.builder()
                .id(id)
                .name(name)
                .email(email)
                .imgUrl(imgUrl)
                .build();
    }
}