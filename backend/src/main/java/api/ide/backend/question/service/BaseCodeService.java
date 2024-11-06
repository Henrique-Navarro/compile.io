package api.ide.backend.question.service;

import api.ide.backend.question.model.BaseCode;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.repository.BaseCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BaseCodeService {

    @Autowired
    private BaseCodeRepository baseCodeRepository;

    public BaseCode save(BaseCode code) {
        return baseCodeRepository.save(code);
    }

    public List<BaseCode> saveBaseCode(Question question) {
        List<BaseCode> savedBaseCodes = new ArrayList<>();

        for (BaseCode baseCode : question.getBaseCodes()) {
            baseCode.setQuestion(question);
            BaseCode savedBaseCode = this.save(baseCode);
            savedBaseCodes.add(savedBaseCode);
        }

        return savedBaseCodes;
    }

    public void updateBaseCode(Question existingQuestion, List<BaseCode> newBaseCodes) {
        // Clear the existing BaseCode entries to maintain the reference
        existingQuestion.getBaseCodes().clear();

        // Add each new BaseCode entry
        for (BaseCode baseCode : newBaseCodes) {
            baseCode.setQuestion(existingQuestion);
            existingQuestion.getBaseCodes().add(baseCode);
        }
    }

    public void deleteAllByQuestion(Question question) {
        baseCodeRepository.deleteAllByQuestion(question);
    }
}
