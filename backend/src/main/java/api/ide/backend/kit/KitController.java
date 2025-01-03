package api.ide.backend.kit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kits")
public class KitController {
    @Autowired
    private KitHandler handler;

    @PostMapping("/save")
    public ResponseEntity<Kit> save(@RequestBody Kit kit) {
        Kit newKit = handler.save(kit);
        return ResponseEntity.ok(newKit);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Kit>> getAll() {
        List<Kit> kits = handler.getAll();
        return ResponseEntity.ok(kits);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Kit> getById(@PathVariable Long id) {
        Kit kit = handler.getById(id);
        return ResponseEntity.ok(kit);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Kit> update(@PathVariable Long id, @RequestBody Kit kit) {
        Kit updatedKit = handler.update(id, kit);
        return ResponseEntity.ok(updatedKit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        handler.delete(id);
        return ResponseEntity.noContent().build();
    }
}
