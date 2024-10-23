package api.ide.backend.correction.dto;

import api.ide.backend.question.dao.Question;

public class CorrectionDTO {

    private boolean hasErrors;
    private int testsPassed;
    private int testsFailed;
    private String feedback;
    private boolean isSafetyCode;
    private String expectedOutput;
    private String output;
    private Question question;
    private Code code;

    public CorrectionDTO() {
    }

    public CorrectionDTO(boolean hasErrors, int testsPassed, int testsFailed, String feedback,
                         boolean isSafetyCode, String expectedOutput, String output) {
        this.hasErrors = hasErrors;
        this.testsPassed = testsPassed;
        this.testsFailed = testsFailed;
        this.feedback = feedback;
        this.isSafetyCode = isSafetyCode;
        this.expectedOutput = expectedOutput;
        this.output = output;
    }

    public boolean hasErrors() {
        return hasErrors;
    }

    public int getTestsPassed() {
        return testsPassed;
    }

    public int getTestsFailed() {
        return testsFailed;
    }

    public String getFeedback() {
        return feedback;
    }

    public boolean isSafetyCode() {
        return isSafetyCode;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public String getOutput() {
        return output;
    }

    @Override
    public String toString() {
        return "CorrectionDTO{" +
                "hasErrors=" + hasErrors +
                ", testsPassed=" + testsPassed +
                ", testsFailed=" + testsFailed +
                ", feedback=" + feedback +
                ", isSafetyCode=" + isSafetyCode +
                ", expectedOutput=" + expectedOutput +
                ", output=" + output +
                '}';
    }
}
