package api.ide.backend.question;

import api.ide.backend.question.model.BaseCode;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.model.TestCase;
import api.ide.backend.question.service.BaseCodeService;
import api.ide.backend.question.service.CorrectCodeService;
import api.ide.backend.question.service.QuestionService;
import api.ide.backend.question.service.TestCaseService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionHandler {
    @Autowired
    private QuestionService service;
    @Autowired
    private BaseCodeService baseCodeService;
    @Autowired
    private CorrectCodeService correctCodeService;
    @Autowired
    private TestCaseService testCaseService;

    public Question getById(Long id) {
        return service.getById(id);
    }

    public List<Question> getAll() {
        return service.getAll();
    }

    public Question save(Question question) {
        Question savedQuestion = service.save(question);

        /** @BaseCode */
        savedQuestion.setBaseCodes(
                baseCodeService.saveBaseCode(savedQuestion)
        );

        /** @CorrectCode */
        savedQuestion.setCorrectCode(
                correctCodeService.save(savedQuestion.getCorrectCode())
        );

        /** @TestCase */
        savedQuestion.setTestCases(
                testCaseService.saveTestCase(savedQuestion)
        );

        return savedQuestion;
    }

    @Transactional
    public Question update(Long id, Question updatedQuestion) {

        Question existingQuestion = service.getById(id);

        if (existingQuestion == null) {
            return null;
        }

        /** Clear */
        existingQuestion.getTestCases().clear();
        existingQuestion.getTestCases().addAll(updatedQuestion.getTestCases());

        existingQuestion.getBaseCodes().clear();
        existingQuestion.getBaseCodes().addAll(updatedQuestion.getBaseCodes());

        baseCodeService.deleteAllByQuestion(existingQuestion);
        testCaseService.deleteAllByQuestion(existingQuestion);

        /** @CorrectCode */
        correctCodeService.updateCorrectCode(
                existingQuestion, updatedQuestion.getCorrectCode()
        );

        List<BaseCode> newBaseCodes = new ArrayList<>();
        for (BaseCode baseCode : updatedQuestion.getBaseCodes()) {
            baseCode.setQuestion(existingQuestion);
            newBaseCodes.add(baseCode);
        }
        existingQuestion.setBaseCodes(newBaseCodes);

        /** Atualizar com novos testCases */
        List<TestCase> newTestCases = new ArrayList<>();
        for (TestCase testCase : updatedQuestion.getTestCases()) {
            testCase.setQuestion(existingQuestion);
            newTestCases.add(testCase);
        }
        existingQuestion.setTestCases(newTestCases);


        /** Another attributes */
        existingQuestion.setTitle(updatedQuestion.getTitle());
        existingQuestion.setDescription(updatedQuestion.getDescription());
        existingQuestion.setObjetive(updatedQuestion.getObjetive());
        existingQuestion.setTask(updatedQuestion.getTask());
        existingQuestion.setExplanation(updatedQuestion.getExplanation());
        existingQuestion.setInputExample(updatedQuestion.getInputExample());
        existingQuestion.setInputFormat(updatedQuestion.getInputFormat());
        existingQuestion.setOutputExample(updatedQuestion.getOutputExample());
        existingQuestion.setOutputFormat(updatedQuestion.getOutputFormat());
        existingQuestion.setCategory(updatedQuestion.getCategory());
        existingQuestion.setLevel(updatedQuestion.getLevel());
        existingQuestion.setPoints(updatedQuestion.getPoints());

        return service.save(existingQuestion);
        //return null;
    }

    public void delete(Long id) {
        if (!service.existsById(id)) {
            return;
        }

        service.delete(id);
    }
}
