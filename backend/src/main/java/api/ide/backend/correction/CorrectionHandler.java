package api.ide.backend.correction;

import api.ide.backend.compiler.CompilerService;
import api.ide.backend.compiler.ProcessOutputDTO;
import api.ide.backend.dto.CodeDTO;
import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.model.TestCase;
import api.ide.backend.question.service.QuestionService;
import api.ide.backend.question.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CorrectionHandler {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CompilerService compilerService;
    @Autowired
    private TestCaseService testCaseService;

    public CorrectionDTO run(CodeDTO codeDTO) {
        return this.correctWithTests(codeDTO, 1);
    }

    public CorrectionDTO submit(CodeDTO codeDTO) {
        return this.correctWithTests(codeDTO, 10);
    }

    public CorrectionDTO correctWithTests(CodeDTO codeDTO, int howManyTests) {
        // Usar chat gpt aqui tambem?
        boolean isSafetyCode = CodeSafetyChecker.isCodeSafe(codeDTO);

        if (!isSafetyCode) {
            return null;
            /*try {
                throw new Exception("Code isn't safe");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }*/
            //return createSafetyFeedback();
        }

        /** @Question */
        Question question = questionService.getById(
                codeDTO.getQuestionId()
        );

        if (question == null) return null;

        /** @TestCase */
        List<TestCase> testCases = testCaseService.getTestCasesByQuestion(
                question, howManyTests
        );

        /** @TestResult */
        List<TestResult> testResults = getTestResults(
                codeDTO, testCases
        );

        /** @CorrectionDTO */
        CorrectionDTO correction = new CorrectionDTO(codeDTO, testResults);

        correction.generate();

        return correction;
    }

    public List<TestResult> getTestResults(CodeDTO codeDTO, List<TestCase> testCases) {
        List<TestResult> testResults = new ArrayList<>();

        for (TestCase testCase : testCases) {
            boolean passed = false;

            ProcessOutputDTO processOutputDTO = compilerService
                    .compile(codeDTO, testCase.getInput());

            /** Error */
            if (processOutputDTO.getExitCode() != 0) {
                TestResult result = new TestResult(
                        testCase,
                        processOutputDTO.getOutput(),
                        false
                );
                testResults.add(result);
            }

            String output = processOutputDTO.getOutput().trim();
            String expected = testCase.getExpectedOutput().trim();

            // Comparar a saída com a saída esperada
            passed = output.equals(expected);

            testResults.add(new TestResult(testCase, output, passed));

            if (!passed) {
                // Prompt.generate(codeDTO, question, output, expected);
            }
        }

        return testResults;
    }
}
