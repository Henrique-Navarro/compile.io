package api.ide.backend.submit_history;

import api.ide.backend.question.exception.QuestionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmitHistoryService {

    @Autowired
    private SubmitHistoryRepository submitHistoryRepository;

    public List<SubmitHistory> getAll() {
        return submitHistoryRepository.findAll();
    }

    public SubmitHistory getById(Long id) {
        try {
            return submitHistoryRepository.findById(id)
                    .orElseThrow(() -> new QuestionNotFoundException(id));
        } catch (QuestionNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public List<SubmitHistory> getAllByUserId(Long userId) {
        return submitHistoryRepository.findByUserId(userId);
    }

    public SubmitHistory save(SubmitHistory submitHistory) {
        return submitHistoryRepository.save(submitHistory);
    }
}
