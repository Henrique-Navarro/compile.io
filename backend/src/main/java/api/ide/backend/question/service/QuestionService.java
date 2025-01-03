package api.ide.backend.question.service;

import api.ide.backend.question.exception.QuestionNotFoundException;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question getById(Long id) {
        try {
            return questionRepository.findById(id)
                    .orElseThrow(() -> new QuestionNotFoundException(id));
        } catch (QuestionNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question save(Question question) {
        return questionRepository.save(question);
    }

    public Question update(Long id, Question question) {
        return questionRepository.save(question);
    }

    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return questionRepository.existsById(id);
    }
}
