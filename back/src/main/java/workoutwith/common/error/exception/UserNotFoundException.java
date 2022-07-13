package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class UserNotFoundException extends BusinessException {
    public UserNotFoundException() {
        super(Messages.NO_USER_MESSAGE);
    }
}
