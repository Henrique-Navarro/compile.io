package api.ide.backend.question;

import api.ide.backend.question.model.Question;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionHandler handler;

    @PostMapping("/save")
    public Question saveQuestion(@RequestBody @Valid Question question) {
        return handler.save(question);
    }

    @GetMapping("/getAll")
    public List<Question> getAll() {
        return handler.getAll();
    }

    @GetMapping("/get/{id}")
    public Question getById(@PathVariable Long id) {
        return handler.getById(id);
    }

    @PutMapping("/update/{id}")
    public Question update(@PathVariable Long id, @RequestBody @Valid Question question) {
        return handler.update(id, question);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        handler.delete(id);
    }
}
