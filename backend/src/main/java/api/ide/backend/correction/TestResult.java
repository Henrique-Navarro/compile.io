package api.ide.backend.correction;

import api.ide.backend.question.model.TestCase;

public class TestResult {
    private TestCase testCase;
    private String output;
    private boolean passed;

    public TestResult(TestCase testCase, String output, boolean passed) {
        this.testCase = testCase;
        this.output = output;
        this.passed = passed;
    }

    public TestCase getTestCase() {
        return testCase;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public boolean isFailed() {
        return !passed;
    }

    @Override
    public String toString() {
        return "TestResult{" +
                "testCase=" + testCase +
                ", output='" + output + '\'' +
                ", passed=" + passed +
                '}';
    }
}
