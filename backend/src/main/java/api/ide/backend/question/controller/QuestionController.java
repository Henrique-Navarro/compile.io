package api.ide.backend.question.controller;

import api.ide.backend.correction.service.CodeService;
import api.ide.backend.question.dao.BaseCode;
import api.ide.backend.question.dao.Question;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private CodeService codeService;


    @PostMapping("/cadastrar")
    public Question cadastrarQuestao(@RequestBody Question questao) {
        return questionService.save(questao);
    }

    @PostMapping("/basecode/cadastrar")
    public BaseCode cadastrarQuestao(@RequestBody BaseCode code) {
        //return baseCodeService.save(code);
        return new BaseCode();
    }

    @GetMapping("/getAll")
    public List<Question> getAll() {
        return !questionService.getAll().isEmpty() ? questionService.getAll() : new ArrayList<>();
    }

    @GetMapping("/get/{id}")
    public Question getAll(@PathVariable Long id) {
        return questionService.getById(id);
    }
}
