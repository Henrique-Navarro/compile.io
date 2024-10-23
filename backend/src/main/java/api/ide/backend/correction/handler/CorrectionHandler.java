package api.ide.backend.correction.handler;

import api.ide.backend.chatgpt.prompt.Prompt;
import api.ide.backend.correction.dto.Code;
import api.ide.backend.correction.dto.CorrectionDTO;
import api.ide.backend.correction.service.CodeService;
import api.ide.backend.feedback.BadFeedback;
import api.ide.backend.feedback.FeedbackGenerator;
import api.ide.backend.model.CodeSafetyChecker;
import api.ide.backend.process.ProcessOutput;
import api.ide.backend.question.dao.Question;
import api.ide.backend.question.dao.TestCase;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorrectionHandler {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CodeService codeService;

    public CorrectionHandler(QuestionService questionService, CodeService codeService) {
        this.questionService = questionService;
        this.codeService = codeService;
    }

    public CorrectionHandler() {
    }

    aa

    public CorrectionDTO correct(Code code) {
        // Verificar se o código é seguro
        boolean isSafetyCode = CodeSafetyChecker.isCodeSafe(code);
        if (!isSafetyCode) {
            return createSafetyFeedback();
        }

        // Obter a questão e os casos de teste
        Question question = questionService.getById(code.getQuestionId());
        List<TestCase> testCases = question.getTestCases();

        int testsPassed = 0;
        int testsFailed = 0;
        String output = "";
        String expected = "";

        // Executar os testes
        for (TestCase testCase : testCases) {
            ProcessOutput processOutput = codeService.compilar(code, testCase.getInput());

            // Verificar se houve erro na execução do código
            if (processOutput.getExitCode() != 0) {
                return createExecutionErrorFeedback(isSafetyCode, processOutput.getOutput());
            }

            output = processOutput.getOutput().trim();
            expected = testCase.getExpectedOutput().trim();

            // Comparar a saída com a saída esperada
            if (output.equals(expected)) {
                testsPassed++;
            } else {
                testsFailed++;

                Prompt.generate(code, question, output, expected);

                return createTestFailureFeedback(isSafetyCode, expected, output);
            }
        }

        FeedbackGenerator feedbackGenerator = new FeedbackGenerator(testsFailed > 0, testsPassed);
        String feedback = feedbackGenerator.generate();

        return new CorrectionDTO(
                testsFailed > 0,
                testsPassed,
                testsFailed,
                feedback,
                isSafetyCode,
                expected,
                output
        );
    }

    // Métodos auxiliares para criar feedbacks
    private CorrectionDTO createSafetyFeedback() {
        FeedbackGenerator feedbackGenerator = new FeedbackGenerator();
        String feedback = feedbackGenerator.generateNonSafety();
        return new CorrectionDTO(true, 0, 0, feedback, false, "", "");
    }

    private CorrectionDTO createExecutionErrorFeedback(boolean isSafetyCode, String errorOutput) {
        return new CorrectionDTO(true, 0, 0, BadFeedback.POOR.name(), isSafetyCode, "", errorOutput);
    }

    private CorrectionDTO createTestFailureFeedback(boolean isSafetyCode, String expected, String output) {
        return new CorrectionDTO(true, 0, 0, BadFeedback.TEST_FAILED.name(), isSafetyCode, expected, output);
    }


    private boolean validateCode(Code code) {
        return false;
    }
}
