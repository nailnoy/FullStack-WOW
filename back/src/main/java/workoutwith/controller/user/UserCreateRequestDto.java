package workoutwith.controller.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import workoutwith.domain.AuthorityStatus;
import workoutwith.domain.User;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequestDto {

    private String id;
    private String name;
    private String email;
    private String imgUrl;
    private AuthorityStatus authority;

    public User toEntity() {
        return User.builder()
                .id(id)
                .name(name)
                .email(email)
                .imgUrl(imgUrl)
                .authority(AuthorityStatus.DEFAULT)
                .build();
    }
}