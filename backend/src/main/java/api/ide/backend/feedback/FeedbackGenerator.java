package api.ide.backend.feedback;

public class FeedbackGenerator {
    private boolean hasError;
    private int testsPassed;

    public FeedbackGenerator() {
    }

    public FeedbackGenerator(boolean hasError, int testsPassed) {
        this.hasError = hasError;
        this.testsPassed = testsPassed;
    }

    public String generate() {
        //return hasError ? BadFeedback.generate() : GoodFeedback.generate(testsPassed);
        return GoodFeedback.generate(testsPassed);
    }

    public String generateNonSafety() {
        return BadFeedback.NON_SAFETY.name();
        //return hasError ? BadFeedback.generate() : GoodFeedback.generate(testsPassed);
        //return GoodFeedback.generate(testsPassed);
    }
}
