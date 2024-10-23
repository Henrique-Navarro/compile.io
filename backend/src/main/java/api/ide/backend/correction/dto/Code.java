package api.ide.backend.correction.dto;

public class Code {

    private Long questionId;
    private String code;
    private String language;

    public Code(Long questionId, String code, String language) {
        this.questionId = questionId;
        this.code = code;
        this.language = language;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public String getCode() {
        return code;
    }

    public String getLanguage() {
        return language;
    }

    @Override
    public String toString() {
        return "Code{" +
                "questionId=" + questionId +
                ", code='" + code + '\'' +
                ", language='" + language + '\'' +
                '}';
    }
}
