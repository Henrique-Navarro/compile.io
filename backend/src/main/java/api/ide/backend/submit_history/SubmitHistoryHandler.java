package api.ide.backend.submit_history;

import api.ide.backend.dto.CodeDTO;
import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.QuestionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmitHistoryHandler {

    @Autowired
    private SubmitHistoryService submitHistoryService;
    @Autowired
    private QuestionHandler questionHandler;

    public List<SubmitHistory> getAll() {
        return submitHistoryService.getAll();
    }

    public SubmitHistory getById(Long id) {
        return submitHistoryService.getById(id);
    }

    public List<SubmitHistory> getAllByUserId(Long userId) {
        return submitHistoryService.getAllByUserId(userId);
    }

    public SubmitHistory save(CodeDTO codeDTO, CorrectionDTO correctionDTO) {
        SubmitHistory submitHistory = new SubmitHistory(
                codeDTO.getCode(),
                codeDTO.getLanguage().getName(),
                codeDTO.getUserId(),
                correctionDTO.getTestsPassed(),
                correctionDTO.getTestsFailed(),
                correctionDTO.hasErrors(),
                correctionDTO.isSafetyCode(),
                correctionDTO.getTestResults(),
                correctionDTO.getQuestionId(),
                questionHandler.getById(correctionDTO.getQuestionId()).getTitle()
        );

        return submitHistoryService.save(submitHistory);
    }
}
