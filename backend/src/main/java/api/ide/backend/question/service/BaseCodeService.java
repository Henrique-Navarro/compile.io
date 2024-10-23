package api.ide.backend.question.service;

import api.ide.backend.question.dao.BaseCode;
import api.ide.backend.question.repository.BaseCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseCodeService {

    @Autowired
    private BaseCodeRepository baseCodeRepository;

    public BaseCode save(BaseCode code) {
        return baseCodeRepository.save(code);
    }
}
