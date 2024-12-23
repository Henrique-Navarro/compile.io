package api.ide.backend.kit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kits")
public class KitController {

    @Autowired
    private KitService kitService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Kit>> getAllKits() {
        List<Kit> kits = kitService.findAll();
        return ResponseEntity.ok(kits);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Kit> getKitById(@PathVariable Long id) {
        return kitService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Kit> createKit(@RequestBody KitRequest kitRequest) {
        Kit savedKit = kitService.createKit(kitRequest);
        return ResponseEntity.ok(savedKit);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Kit> updateKit(@PathVariable Long id, @RequestBody KitRequest kitRequest) {
        try {
            Kit updatedKit = kitService.updateKit(id, kitRequest);
            return ResponseEntity.ok(updatedKit);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKit(@PathVariable Long id) {
        kitService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
