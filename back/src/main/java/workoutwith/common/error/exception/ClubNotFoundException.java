package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class ClubNotFoundException extends BusinessException {
    public ClubNotFoundException() {
        super(Messages.NO_CLUB_MESSAGE);
    }
}