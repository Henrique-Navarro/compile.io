package api.ide.backend.dto;

import api.ide.backend.compiler.Language;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;

public class CodeDTO {

    private Long questionId;

    @Lob
    @Column(name = "code", columnDefinition = "LONGTEXT")
    private String code;
    private String language;
    private Long userId;

    public CodeDTO(Long questionId, String code, String language, Long userId) {
        this.questionId = questionId;
        this.code = code;
        this.language = language;
        this.userId = userId;
    }

    public CodeDTO() {
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Language getLanguage() {
        Language language = Language.valueOf(this.language.toUpperCase());

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

    @Override
    public String toString() {
        return "CodeDTO{" +
                "questionId=" + questionId +
                ", code='" + code + '\'' +
                ", language='" + language + '\'' +
                ", userId=" + userId +
                '}';
    }
}
