package api.ide.backend.question.model;

import api.ide.backend.compiler.CompilerService;
import api.ide.backend.compiler.ProcessOutputDTO;
import api.ide.backend.correction.TestResult;
import api.ide.backend.dto.CodeDTO;

import java.util.concurrent.Callable;

public class TestTask implements Callable<TestResult> {
    private final CodeDTO codeDTO;
    private final TestCase testCase;
    private final CompilerService compilerService;

    public TestTask(CodeDTO codeDTO, TestCase testCase, CompilerService compilerService) {
        this.codeDTO = codeDTO;
        this.testCase = testCase;
        this.compilerService = compilerService;
    }

    @Override
    public TestResult call() {
        boolean passed = false;

        long startTime = System.currentTimeMillis();
        System.out.println("Iniciando o teste para o caso: " + testCase.getId() + " na thread: " + Thread.currentThread().getName());

        ProcessOutputDTO processOutputDTO = compilerService.compile(codeDTO, testCase.getInput());

        if (processOutputDTO.getExitCode() != 0) {
            return new TestResult(testCase, processOutputDTO.getOutput(), false);
        }

        String output = processOutputDTO.getOutput().trim();
        String expected = testCase.getExpectedOutput().trim();
        passed = output.equals(expected);

        long endTime = System.currentTimeMillis();
        System.out.println("Teste concluído para o caso: " + testCase.getId() + " em " + (endTime - startTime) + " ms");

        return new TestResult(testCase, output, passed);
    }
}