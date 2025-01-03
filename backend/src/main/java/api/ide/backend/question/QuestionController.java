package api.ide.backend.question;

import api.ide.backend.question.model.Question;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionHandler handler;

    @PostMapping("/save")
    public ResponseEntity<Question> save(@RequestBody @Valid Question question) {
        Question newQuestion = handler.save(question);
        return ResponseEntity.ok(newQuestion);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Question>> getAll() {
        List<Question> questions = handler.getAll();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Question> getById(@PathVariable Long id) {
        Question question = handler.getById(id);
        return ResponseEntity.ok(question);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Question> update(@PathVariable Long id, @RequestBody @Valid Question question) {
        Question updatedQuestion = handler.update(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        handler.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<Void> deleteAll() {
        handler.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
