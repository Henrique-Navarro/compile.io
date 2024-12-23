package api.ide.backend.submit_history;

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
        return submitHistoryRepository.findById(id).orElse(null);
    }

    public List<SubmitHistory> getAllByUserId(Long userId) {
        return submitHistoryRepository.findByUserId(userId);
    }

    public SubmitHistory save(SubmitHistory submitHistory) {
        return submitHistoryRepository.save(submitHistory);
    }
}
