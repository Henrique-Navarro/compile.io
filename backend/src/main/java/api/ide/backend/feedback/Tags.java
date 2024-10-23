package api.ide.backend.feedback;

public enum Tags {
    DESCRIPTION("DESCRIPTION"),
    QUESTION("QUESTION"),
    INPUT_CODE("INPUT_CODE"),
    FEEDBACK("FEEDBACK"),
    SUGGESTIONS("SUGGESTIONS"),
    EXAMPLES("EXAMPLES"),
    OUTPUT("OUTPUT"),
    EXPECTED_OUTPUT("EXPECTED_OUTPUT"),
    NOTHING("NOTHING"),
    TITLE("TITLE"),
    STATEMENT("STATEMENT"),
    INPUT_EXAMPLE("INPUT_EXAMPLE"),
    OUTPUT_EXAMPLE("OUTPUT_EXAMPLE"),
    RESPONSE_STRUCTURE("RESPONSE_STRUCTURE"),
    CORRECTION_CODE("CORRECTION_CODE"),
    CDATA("CDATA");


    private final String tag;

    Tags(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }

    public String openTag() {
        return "<" + tag + ">";
    }

    public String closeTag() {
        return "</" + tag + ">";
    }

    public String wrap(String content) {
        if (this == Tags.CDATA) {
            return "<![CDATA[" + content + "]]>";
        }
        return openTag() + "\n" + content + "\n" + closeTag();
    }
}
