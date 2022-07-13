package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class LikedClubNotFoundException extends BusinessException {
    public LikedClubNotFoundException() {
        super(Messages.NO_LIKED_CLUB_MESSAGE);
    }
}
