package api.ide.backend.correction;

import api.ide.backend.compiler.CompilerService;
import api.ide.backend.compiler.ProcessOutputDTO;
import api.ide.backend.dto.CodeDTO;
import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.model.TestCase;
import api.ide.backend.question.model.TestTask;
import api.ide.backend.question.service.QuestionService;
import api.ide.backend.question.service.TestCaseService;
import api.ide.backend.submit_history.SubmitHistoryHandler;
import api.ide.backend.user.UserHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class CorrectionHandler {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CompilerService compilerService;
    @Autowired
    private TestCaseService testCaseService;
    @Autowired
    private SubmitHistoryHandler submitHistoryHandler;
    @Autowired
    private UserHandler userHandler;

    public CorrectionDTO run(CodeDTO codeDTO) {
        return this.correctWithTests(codeDTO, false);
    }

    public CorrectionDTO submit(CodeDTO codeDTO) {
        //CompletableFuture<CorrectionDTO> correctionFuture = CompletableFuture.supplyAsync(() -> correctWithTests(codeDTO, true));

        try {
            CorrectionDTO correctionDTO = this.correctWithTests(codeDTO, true);
            submitHistoryHandler.save(codeDTO, correctionDTO);
            userHandler.linkQuestionToUser(correctionDTO);

            return correctionDTO;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public CorrectionDTO correctWithTests(CodeDTO codeDTO, boolean maxTestCases) {
        boolean isSafetyCode = CodeSafetyChecker.isCodeSafe(codeDTO);

        if (!isSafetyCode) {
            return null;
        }

        Question question = questionService.getById(codeDTO.getQuestionId());
        if (question == null) return null;

        List<TestCase> testCases = testCaseService.getTestCasesByQuestion(question, maxTestCases);
        List<TestResult> testResults = new ArrayList<>();

        ExecutorService executorService = Executors.newFixedThreadPool(10); // Pool de threads com 10 threads
        List<Future<TestResult>> futures = new ArrayList<>();

        try {
            for (TestCase testCase : testCases) {
                futures.add(executorService.submit(new TestTask(codeDTO, testCase, compilerService)));
            }

            for (Future<TestResult> future : futures) {
                testResults.add(future.get());
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null;
        } finally {
            executorService.shutdown();
        }

        CorrectionDTO correction = new CorrectionDTO(codeDTO, testResults);
        correction.generate();

        return correction;
    }



    /*@Async("taskExecutor")
    public CompletableFuture<TestResult> runTestAsync(CodeDTO codeDTO, TestCase testCase) {
        boolean passed = false;

        long startTime = System.currentTimeMillis();
        System.out.println("Iniciando o teste para o caso: " + testCase.getId() + " na thread: " + Thread.currentThread().getName());


        ProcessOutputDTO processOutputDTO = compilerService.compile(codeDTO, testCase.getInput());

        if (processOutputDTO.getExitCode() != 0) {
            return CompletableFuture.completedFuture(new TestResult(testCase, processOutputDTO.getOutput(), false));
        }

        String output = processOutputDTO.getOutput().trim();
        String expected = testCase.getExpectedOutput().trim();

        passed = output.equals(expected);

        long endTime = System.currentTimeMillis();
        System.out.println("Teste concluído para o caso: " + testCase.getId() + " em " + (endTime - startTime) + " ms");

        return CompletableFuture.completedFuture(new TestResult(testCase, output, passed));
    }*/

    public List<TestResult> getTestResults(CodeDTO codeDTO, List<TestCase> testCases) {
        List<TestResult> testResults = new ArrayList<>();

        for (TestCase testCase : testCases) {
            boolean passed = false;

            /* Compiler */
            ProcessOutputDTO processOutputDTO = compilerService
                    .compile(codeDTO, testCase.getInput());

            /** Error */
            if (processOutputDTO.getExitCode() != 0) {
                TestResult result = new TestResult(testCase, processOutputDTO.getOutput(), false);
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
