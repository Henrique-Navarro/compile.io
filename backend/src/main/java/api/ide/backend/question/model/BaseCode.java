package api.ide.backend.question.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class BaseCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Language is required")
    private String language;

    @Lob
    @NotEmpty(message = "Code is required")
    private String code;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;

    public BaseCode(Long id, String language, String code, Question question) {
        this.id = id;
        this.language = language;
        this.code = code;
        this.question = question;
    }

    public BaseCode() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    @Override
    public String toString() {
        return "BaseCode{" +
                "id=" + id +
                ", language='" + language + '\'' +
                ", code='" + code + '\'' +
                ", question=" + question +
                '}';
    }
}
