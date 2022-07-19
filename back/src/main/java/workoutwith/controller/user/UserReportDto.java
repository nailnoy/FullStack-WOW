package workoutwith.controller.user;

import workoutwith.domain.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class UserReportDto { //DTO : 로직x. 순수한 데이터 객체, getter, setter 만을 가짐

    private int authority;
    private int declaration;

    public UserReportDto(User user) {
        BeanUtils.copyProperties(user, this);
    }
}
