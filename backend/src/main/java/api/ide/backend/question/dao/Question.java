package api.ide.backend.question.dao;

import api.ide.backend.enums.Category;
import api.ide.backend.enums.Level;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String enunciado;

    private String inputExample;
    private String outputExample;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "base_code")
    //@JsonManagedReference
    private BaseCode baseCode;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "correct_code")
    private CorrectCode correctCode;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TestCase> testCases = new ArrayList<>();

    private Category category;
    private Level level;

    public Question() {
    }

    public Question(Long id, String title, String enunciado, String inputExample, String outputExample, BaseCode baseCode, CorrectCode correctCode, List<TestCase> testCases, Category category, Level level) {
        this.id = id;
        this.title = title;
        this.enunciado = enunciado;
        this.inputExample = inputExample;
        this.outputExample = outputExample;
        this.baseCode = baseCode;
        this.correctCode = correctCode;
        this.testCases = testCases;
        this.category = category;
        this.level = level;
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

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
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

    public BaseCode getBaseCode() {
        return baseCode;
    }

    public void setBaseCode(BaseCode baseCode) {
        this.baseCode = baseCode;
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

    @Override
    public String toString() {
        return "Questao{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", enunciado='" + enunciado + '\'' +
                ", inputExample='" + inputExample + '\'' +
                ", outputExample='" + outputExample + '\'' +
                ", baseCode=" + baseCode.toString() +
                ", testCases=" + testCases.toString() +
                '}';
    }
}
