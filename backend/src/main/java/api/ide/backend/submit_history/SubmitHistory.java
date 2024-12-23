package api.ide.backend.submit_history;

import api.ide.backend.correction.TestResult;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Entity
public class SubmitHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "code", columnDefinition = "LONGTEXT")
    private String code;
    private String language;
    private Long userId;
    private int testsPassed;
    private int testsFailed;
    private boolean hasErrors;
    private boolean isSafetyCode;
    private Long questionId;
    private String questionTitle;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "submit_history_id")
    private List<TestResult> testResults = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    public SubmitHistory(String code, String language, Long userId, int testsPassed, int testsFailed, boolean hasErrors, boolean isSafetyCode, List<TestResult> testResults, Long questionId, String questionTitle) {
        this.code = code;
        this.language = language;
        this.userId = userId;
        this.testsPassed = testsPassed;
        this.testsFailed = testsFailed;
        this.hasErrors = hasErrors;
        this.isSafetyCode = isSafetyCode;
        this.testResults = testResults;
        this.questionId = questionId;
        this.questionTitle = questionTitle;
    }

    public SubmitHistory() {

    }

    public String getCreatedAt() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd:MM:yyyy HH:mm:ss");
        return createdAt.format(formatter);
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public boolean isHasErrors() {
        return hasErrors;
    }

    public void setHasErrors(boolean hasErrors) {
        this.hasErrors = hasErrors;
    }

    public boolean isSafetyCode() {
        return isSafetyCode;
    }

    public void setSafetyCode(boolean safetyCode) {
        isSafetyCode = safetyCode;
    }

    public List<TestResult> getTestResults() {
        return testResults;
    }

    public void setTestResults(List<TestResult> testResults) {
        this.testResults = testResults;
    }
}
