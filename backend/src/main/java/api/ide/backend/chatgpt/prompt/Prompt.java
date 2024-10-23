package api.ide.backend.chatgpt.prompt;

import api.ide.backend.correction.dto.Code;
import api.ide.backend.feedback.Tags;
import api.ide.backend.question.dao.Question;

public class Prompt {
    public static String generate(Code code, Question question, String output, String expectedOutput) {
        StringBuilder prompt = new StringBuilder();

        prompt.append(Tags.DESCRIPTION.wrap(
                "\tReview the following " + code.getLanguage() + " code and provide the corrected version.\n" +
                        "\tFocus on fixing syntax errors, improving logic, and optimizing the code.\n" +
                        "\tDo not include explanations or comments. Only return the corrected code."
        ));

        prompt.append(Tags.QUESTION.wrap(
                "\t" + Tags.TITLE.wrap(question.getTitle()) + "\n" +
                        "\t" + Tags.STATEMENT.wrap(question.getEnunciado()) + "\n" +
                        "\t" + Tags.INPUT_EXAMPLE.wrap(question.getInputExample()) + "\n" +
                        "\t" + Tags.OUTPUT_EXAMPLE.wrap(question.getOutputExample())
        ));

        prompt.append(Tags.INPUT_CODE.wrap(
                "\tThe provided base code is in " + code.getLanguage() + ".\n" +
                        "\tReview the following code: \n" +
                        "\t" + Tags.CDATA.wrap(code.getCode())
        ));

        prompt.append(Tags.OUTPUT.wrap(
                "\tThe actual output was: '" + output + "'"
        ));

        prompt.append(Tags.EXPECTED_OUTPUT.wrap(
                "\tHowever, the expected output was: '" + expectedOutput + "'"
        ));

        prompt.append(Tags.SUGGESTIONS.wrap(
                "\tRespond only with the corrected code, enclosed in the `<CORRECTION_CODE>` tag.\n" +
                        "\tDo not include any comments, explanations, or additional text.\n" +
                        "\tIf the code is already correct, leave the `<CORRECTION_CODE>` with value 'CORRECT'."
        ));

        prompt.append(Tags.CORRECTION_CODE.wrap(""
        ));

        System.out.println(prompt.toString());
        return prompt.toString();
    }
}

