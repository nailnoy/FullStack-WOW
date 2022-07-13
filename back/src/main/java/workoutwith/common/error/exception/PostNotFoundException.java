package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class PostNotFoundException extends BusinessException {
    public PostNotFoundException() {
        super(Messages.NO_CLUB_MESSAGE);
    }
}