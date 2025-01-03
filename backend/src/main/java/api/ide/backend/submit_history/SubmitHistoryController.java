package api.ide.backend.submit_history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
public class SubmitHistoryController {

    @Autowired
    private SubmitHistoryHandler handler;

    @GetMapping("/get-all")
    public ResponseEntity<List<SubmitHistory>> getAll() {
        List<SubmitHistory> submitHistories = handler.getAll();
        return ResponseEntity.ok(submitHistories);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SubmitHistory> getById(@PathVariable Long id) {
        SubmitHistory submitHistory = handler.getById(id);
        return ResponseEntity.ok(submitHistory);
    }

    @GetMapping("/getAllByUserId/{userId}")
    public ResponseEntity<List<SubmitHistory>> getAllByUserId(@PathVariable Long userId) {
        List<SubmitHistory> submitHistories = handler.getAllByUserId(userId);
        return ResponseEntity.ok(submitHistories);
    }
}
