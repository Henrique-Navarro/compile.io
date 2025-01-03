package api.ide.backend.enums;

import api.ide.backend.user.User;

public enum Achievement {
    FIVE_MATH_QUESTIONS("Solve 5 math questions"),
    TEN_MATH_QUESTIONS("Solve 10 math questions"),
    FIRST_CODE_SUBMISSION("Submit your first code"),
    PERFECT_SCORE("Achieve a perfect score on a question");

    private final String description;

    Achievement(String description) {
        this.description = description;
    }

    public static Achievement[] getAll() {
        return values();
    }

    public static boolean check(User user, Achievement achievement) {
        if (achievement == FIVE_MATH_QUESTIONS) {
            return user.getQuestionsSolved().size() >= 5;
        }
        if (achievement == TEN_MATH_QUESTIONS) {
            return user.getQuestionsSolved().size() >= 10;
        }
        return achievement == FIRST_CODE_SUBMISSION;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return "Achievement{" +
                "description='" + description + '\'' +
                '}';
    }
}
