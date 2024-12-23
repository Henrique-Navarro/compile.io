package api.ide.backend.correction;

import api.ide.backend.question.model.TestCase;
import jakarta.persistence.*;

@Entity
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "test_case_id")
    private TestCase testCase;
    @Lob
    @Column(name = "output", columnDefinition = "LONGTEXT")
    private String output;
    private boolean passed;

    public TestResult(TestCase testCase, String output, boolean passed) {
        this.testCase = testCase;
        this.output = output;
        this.passed = passed;
    }

    public TestResult() {
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
