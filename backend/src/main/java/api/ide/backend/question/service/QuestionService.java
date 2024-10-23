package api.ide.backend.question.service;

import api.ide.backend.question.dao.BaseCode;
import api.ide.backend.question.dao.CorrectCode;
import api.ide.backend.question.dao.Question;
import api.ide.backend.question.dao.TestCase;
import api.ide.backend.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private BaseCodeService baseCodeService;

    @Autowired
    private CorrectCodeService correctCodeService;

    public void corrigirQuestao(Question question) {
        questionRepository.save(question);
    }

    public Question getById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question save(Question question) {
        BaseCode savedBaseCode = baseCodeService.save(question.getBaseCode());
        question.setBaseCode(savedBaseCode);

        CorrectCode savedCorrectCode = correctCodeService.save(question.getCorrectCode());
        question.setCorrectCode(savedCorrectCode);

        for (TestCase testCase : question.getTestCases()) {
            testCase.setQuestion(question);
        }

        return questionRepository.save(question);
    }

    public void saveQuestion(Question question) {
        questionRepository.save(question);
    }
}
