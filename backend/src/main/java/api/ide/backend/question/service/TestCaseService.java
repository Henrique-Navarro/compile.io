package api.ide.backend.question.service;

import api.ide.backend.question.model.Question;
import api.ide.backend.question.model.TestCase;
import api.ide.backend.question.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestCaseService {
    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private QuestionService questionService;

    public TestCase save(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    public List<TestCase> saveTestCase(Question question) {
        List<TestCase> savedTestCases = new ArrayList<>();

        for (TestCase testCase : question.getTestCases()) {
            testCase.setQuestion(question);
            TestCase savedTestCase = this.save(testCase);
            savedTestCases.add(savedTestCase);
        }
        question.setTestCases(savedTestCases);

        return savedTestCases;
    }

    public List<TestCase> getTestCasesByQuestion(Question question, int howMany) {
        List<TestCase> testCases =
                question
                        .getTestCases()
                        .subList(0, howMany);

        return new ArrayList<>(testCases);
    }

    public void updateTestCases(Question existingQuestion, List<TestCase> newTestCases) {
        // Clear existing TestCase entries
        existingQuestion.getTestCases().clear();

        // Add each new TestCase entry
        for (TestCase testCase : newTestCases) {
            testCase.setQuestion(existingQuestion);
            existingQuestion.getTestCases().add(testCase);
        }
    }

    public void deleteAllByQuestion(Question question) {
        testCaseRepository.deleteAllByQuestion(question);
    }
}