package api.ide.backend.submit_history;

import api.ide.backend.dto.CodeDTO;
import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.QuestionHandler;
import api.ide.backend.user.User;
import api.ide.backend.user.UserHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmitHistoryHandler {

    @Autowired
    private SubmitHistoryService service;
    @Autowired
    private QuestionHandler questionHandler;
    @Autowired
    private UserHandler userHandler;

    public List<SubmitHistory> getAll() {
        return service.getAll();
    }

    public SubmitHistory getById(Long id) {
        return service.getById(id);
    }

    public List<SubmitHistory> getAllByUserId(Long userId) {
        User user = userHandler.getById(userId);
        return service.getAllByUserId(user.getId());
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

        return service.save(submitHistory);
    }
}
