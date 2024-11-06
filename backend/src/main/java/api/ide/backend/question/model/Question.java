package api.ide.backend.question.model;

import api.ide.backend.enums.Category;
import api.ide.backend.enums.Level;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Title is required")
    private String title;

    @NotEmpty(message = "Description is required")
    private String description;

    @NotEmpty(message = "Objetive is required")
    private String objetive;

    @NotEmpty(message = "Task is required")
    private String task;

    @NotEmpty(message = "Explanation is required")
    private String explanation;

    private String inputFormat;
    private String inputExample;

    @NotEmpty(message = "Output example is required")
    private String outputExample;

    @NotEmpty(message = "Output format example is required")
    private String outputFormat;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<BaseCode> baseCodes = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "correct_code")
    private CorrectCode correctCode;

    @NotNull(message = "Category is required")
    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull(message = "Level is required")
    @Enumerated(EnumType.STRING)
    private Level level;

    @NotNull(message = "Points are required")
    private int points;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<TestCase> testCases = new ArrayList<>();

    public Question(Long id, String title, String description, String objetive, String task, String explanation, String inputFormat, String inputExample, String outputExample, String outputFormat, List<BaseCode> baseCodes, CorrectCode correctCode, Category category, Level level, int points, List<TestCase> testCases) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.objetive = objetive;
        this.task = task;
        this.explanation = explanation;
        this.inputFormat = inputFormat;
        this.inputExample = inputExample;
        this.outputExample = outputExample;
        this.outputFormat = outputFormat;
        this.baseCodes = baseCodes;
        this.correctCode = correctCode;
        this.category = category;
        this.level = level;
        this.points = points;
        this.testCases = testCases;
    }

    public Question() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjetive() {
        return objetive;
    }

    public void setObjetive(String objetive) {
        this.objetive = objetive;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getInputFormat() {
        return inputFormat;
    }

    public void setInputFormat(String inputFormat) {
        this.inputFormat = inputFormat;
    }

    public String getOutputFormat() {
        return outputFormat;
    }

    public void setOutputFormat(String outputFormat) {
        this.outputFormat = outputFormat;
    }

    public String getInputExample() {
        return inputExample;
    }

    public void setInputExample(String inputExample) {
        this.inputExample = inputExample;
    }

    public String getOutputExample() {
        return outputExample;
    }

    public void setOutputExample(String outputExample) {
        this.outputExample = outputExample;
    }

    public List<BaseCode> getBaseCodes() {
        return baseCodes;
    }

    public void setBaseCodes(List<BaseCode> baseCodes) {
        this.baseCodes = baseCodes;
    }

    public CorrectCode getCorrectCode() {
        return correctCode;
    }

    public void setCorrectCode(CorrectCode correctCode) {
        this.correctCode = correctCode;
    }

    public List<TestCase> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<TestCase> testCases) {
        this.testCases = testCases;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", objetive='" + objetive + '\'' +
                ", task='" + task + '\'' +
                ", inputFormat='" + inputFormat + '\'' +
                ", inputExample='" + inputExample + '\'' +
                ", outputExample='" + outputExample + '\'' +
                ", outputFormat='" + outputFormat + '\'' +
                ", baseCodes=" + baseCodes +
                ", correctCode=" + correctCode +
                ", category=" + category +
                ", level=" + level +
                ", points=" + points +
                ", testCases=" + testCases +
                '}';
    }

    public String toSimpleString() {
        return "Question{" +
                "id=" + id +
                ", title='" + title + '\'';
    }
}
