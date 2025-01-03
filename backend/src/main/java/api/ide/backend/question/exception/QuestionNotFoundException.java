package api.ide.backend.question.exception;

public class QuestionNotFoundException extends Exception {
    public QuestionNotFoundException(Long id) {
        super("Question with ID " + id + " not found.");
    }
}
