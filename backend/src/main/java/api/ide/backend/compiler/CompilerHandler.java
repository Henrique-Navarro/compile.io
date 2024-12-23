package api.ide.backend.compiler;

import api.ide.backend.dto.CodeDTO;
import api.ide.backend.question.model.Question;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompilerHandler {

    @Autowired
    private CompilerService service;
    @Autowired
    private QuestionService questionService;

    public ProcessOutputDTO run(CodeDTO codeDTO) {
        Question question = questionService.getById(codeDTO.getQuestionId());
        return service.compile(codeDTO, question.getInputExample());
    }
}
