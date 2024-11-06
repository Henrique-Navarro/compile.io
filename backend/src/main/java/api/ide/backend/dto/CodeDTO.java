package api.ide.backend.dto;

public class CodeDTO {

    private Long questionId;
    private String code;
    private String language;
    private Long userId;

    public CodeDTO(Long questionId, String code, String language, Long userId) {
        this.questionId = questionId;
        this.code = code;
        this.language = language;
        this.userId = userId;
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
