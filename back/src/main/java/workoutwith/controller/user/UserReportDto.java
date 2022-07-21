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
public class UserReportDto { //DTO : 로직x. 순수한 데이터 객체, getter, setter 만을 가짐

    private AuthorityStatus authority;
    private int declaration;

    public UserReportDto(User user) {
        BeanUtils.copyProperties(user, this);
    }
}
