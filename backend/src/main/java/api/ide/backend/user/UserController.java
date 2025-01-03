package api.ide.backend.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserHandler handler;

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody @Valid User user) {
        User newUser = handler.save(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = handler.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        User user = handler.getById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody @Valid User userDetails) {
        User updatedUser = handler.update(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        handler.delete(id);
        return ResponseEntity.noContent().build();
    }
}
