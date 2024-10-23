package api.ide.backend.question.service;

import api.ide.backend.question.dao.CorrectCode;
import api.ide.backend.question.repository.CorrectCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CorrectCodeService {

    @Autowired
    private CorrectCodeRepository correctCodeRepository;

    public CorrectCode save(CorrectCode code) {
        return correctCodeRepository.save(code);
    }
}
