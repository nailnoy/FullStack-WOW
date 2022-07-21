package workoutwith.service;

import workoutwith.controller.user.UserReportDto;
import workoutwith.domain.AuthorityStatus;
import workoutwith.domain.User;
import workoutwith.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) //-> 값을 변경하는 경우 해당 메서드 앞에 readonly 없는 @Transactional을 써준다
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User searchUser(String userId) {
        return userRepository.findById(userId)
                .orElse(null);
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    
    @Transactional
    public void reportUser(UserReportDto reportDto, String userId) {
    	final User user = searchUser(userId);
    	if(user.getDeclaration() > 2) {
    		reportDto.setAuthority(AuthorityStatus.BANNED);
    		reportDto.setDeclaration(user.getDeclaration()+1);
    	}else {
    		reportDto.setAuthority(AuthorityStatus.DEFAULT);
    		reportDto.setDeclaration(user.getDeclaration()+1);
    	}
        user.reportUser(reportDto.getAuthority(),
        				reportDto.getDeclaration());
    }
}
