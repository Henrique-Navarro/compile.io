package api.ide.backend.dto;

import api.ide.backend.correction.TestResult;
import api.ide.backend.feedback.FeedbackGenerator;
import api.ide.backend.question.model.Question;

import java.util.List;

public class CorrectionDTO {

    private int testsPassed;
    private int testsFailed;
    private boolean hasErrors;

    private String feedback;
    private boolean isSafetyCode;

    private List<TestResult> testResults;
    private String expectedOutput;
    private String output;
    private Long questionId;
    private CodeDTO codeDTO;
    private Long userId;

    public CorrectionDTO(CodeDTO codeDTO, List<TestResult> testResults) {
        this.codeDTO = codeDTO;
        this.testResults = testResults;
    }

    public CorrectionDTO(boolean hasErrors, int testsPassed, int testsFailed, String feedback, boolean isSafetyCode, String expectedOutput, String output, Long questionId, CodeDTO codeDTO, List<TestResult> testResults, Long userId) {
        this.hasErrors = hasErrors;
        this.testsPassed = testsPassed;
        this.testsFailed = testsFailed;
        this.feedback = feedback;
        this.isSafetyCode = isSafetyCode;
        this.expectedOutput = expectedOutput;
        this.output = output;
        this.questionId = questionId;
        this.codeDTO = codeDTO;
        this.testResults = testResults;
        this.userId = userId;
    }

    public void generate() {
        /** Check tests passed and failed */
        int testsPassed = (int) testResults.stream().filter(TestResult::isPassed).count();
        int testsFailed = (int) testResults.stream().filter(TestResult::isFailed).count();

        this.setTestsPassed(testsPassed);
        this.setTestsFailed(testsFailed);
        this.setHasErrors(testsFailed > 0);

        /** Generate feedback */
        FeedbackGenerator feedbackGenerator = new FeedbackGenerator(this.getTestsFailed() > 0, this.getTestsPassed());
        this.setFeedback(feedbackGenerator.generate());
        this.setSafetyCode(true);

        /** Question corrected */
        Question question = testResults.getFirst().getTestCase().getQuestion();

        /** Expected and result output */
        this.setExpectedOutput(question.getOutputExample());
        this.setOutput(testResults.getFirst().getOutput());
        this.setQuestionId(question.getId());

        /** CodeDTO */
        this.setCodeDTO(codeDTO);

        /** User */
        this.setUserId(codeDTO.getUserId());
    }

    public boolean hasErrors() {
        return hasErrors;
    }

    public int getTestsPassed() {
        return testsPassed;
    }

    public void setTestsPassed(int testsPassed) {
        this.testsPassed = testsPassed;
    }

    public int getTestsFailed() {
        return testsFailed;
    }

    public void setTestsFailed(int testsFailed) {
        this.testsFailed = testsFailed;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public boolean isSafetyCode() {
        return isSafetyCode;
    }

    public void setSafetyCode(boolean safetyCode) {
        isSafetyCode = safetyCode;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public boolean isHasErrors() {
        return hasErrors;
    }

    public void setHasErrors(boolean hasErrors) {
        this.hasErrors = hasErrors;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public CodeDTO getCodeDTO() {
        return codeDTO;
    }

    public void setCodeDTO(CodeDTO codeDTO) {
        this.codeDTO = codeDTO;
    }

    public List<TestResult> getTestResults() {
        return testResults;
    }

    public void setTestResults(List<TestResult> testResults) {
        this.testResults = testResults;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "CorrectionDTO{" +
                "testsPassed=" + testsPassed +
                ", testsFailed=" + testsFailed +
                ", hasErrors=" + hasErrors +
                ", feedback='" + feedback + '\'' +
                ", isSafetyCode=" + isSafetyCode +
                ", testResults=" + testResults +
                ", expectedOutput='" + expectedOutput + '\'' +
                ", output='" + output + '\'' +
                ", questionId=" + questionId +
                ", codeDTO=" + codeDTO +
                ", userId=" + userId +
                '}';
    }
}
