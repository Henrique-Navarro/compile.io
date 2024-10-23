package api.ide.backend.feedback;

public class FeedbackRequest {
    private String description;
    private String question;
    private String inputCode;

    public FeedbackRequest(
            String description,
            String question,
            String inputCode
    ) {
        this.description = description;
        this.question = question;
        this.inputCode = inputCode;
    }

    public String toXML() {
        return
                Tags.DESCRIPTION.wrap(description) +
                        Tags.QUESTION.wrap(question) +
                        Tags.INPUT_CODE.wrap(inputCode);
    }
}