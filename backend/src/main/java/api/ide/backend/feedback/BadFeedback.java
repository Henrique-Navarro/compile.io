package api.ide.backend.feedback;

import java.util.Random;

public enum BadFeedback {

    POOR, BAD, NEEDS_IMPROVEMENT, NON_SAFETY, TEST_FAILED;

    public static String generate() {
        BadFeedback[] feedbacks = values();
        int randomIndex = new Random().nextInt(feedbacks.length);
        return feedbacks[randomIndex].name();
    }
}
