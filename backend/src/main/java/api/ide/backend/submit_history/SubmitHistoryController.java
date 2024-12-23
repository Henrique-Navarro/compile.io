package api.ide.backend.submit_history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
public class SubmitHistoryController {

    @Autowired
    private SubmitHistoryHandler submitHistoryHandler;

    @GetMapping("getAll")
    public List<SubmitHistory> getAll() {
        return submitHistoryHandler.getAll();
    }

    @GetMapping("get/{id}")
    public SubmitHistory getById(@PathVariable Long id) {
        return submitHistoryHandler.getById(id);
    }

    @GetMapping("getAllByUserId/{userId}")
    public List<SubmitHistory> getAllByUserId(@PathVariable Long userId) {
        return submitHistoryHandler.getAllByUserId(userId);
    }
}
