package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class MemberNotFoundException extends BusinessException {
    public MemberNotFoundException() {
        super(Messages.NO_MEMBER_MESSAGE);
    }
}
