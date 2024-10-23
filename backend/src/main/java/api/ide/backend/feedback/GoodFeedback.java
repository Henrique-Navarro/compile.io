package api.ide.backend.feedback;

import java.util.Random;

public enum GoodFeedback {

    OKAY, GOOD, IMPRESSIVE, GREAT, AWESOME, EXCELLENT;

    public static String generate(int testsPassed) {
        return switch (testsPassed) {
            case 10 -> GoodFeedback.EXCELLENT.name();
            case 9 -> GoodFeedback.AWESOME.name();
            case 8 -> GoodFeedback.GREAT.name();
            case 7 -> GoodFeedback.IMPRESSIVE.name();
            case 6 -> GoodFeedback.GOOD.name();
            default -> GoodFeedback.OKAY.name();
        };
    }

    public static String generateRandom() {
        GoodFeedback[] feedbacks = values();
        int randomIndex = new Random().nextInt(feedbacks.length);
        return feedbacks[randomIndex].name();
    }
}
