package workoutwith.controller.user;

import org.springframework.beans.BeanUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import workoutwith.domain.AuthorityStatus;
import workoutwith.domain.User;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto { //DTO : 로직x. 순수한 데이터 객체, getter, setter 만을 가짐

    private String id;
    private String name;
    private String email;
    private String imgUrl;
    private AuthorityStatus authority;
    private int declaration;

    public UserResponseDto(User user) {
        BeanUtils.copyProperties(user, this);
    }
}
