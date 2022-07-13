package workoutwith.common.error.exception;

import workoutwith.common.Messages;

public class CommentNotFoundException extends BusinessException{
    public CommentNotFoundException() {
        super(Messages.NO_COMMENT_MESSAGE);
    }
}
