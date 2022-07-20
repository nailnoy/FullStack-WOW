package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class ReviewNotFoundException extends BusinessException {
    public ReviewNotFoundException() {
        super(Messages.NO_CLUB_MESSAGE);
    }
}