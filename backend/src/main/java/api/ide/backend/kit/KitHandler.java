package api.ide.backend.kit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KitHandler {

    @Autowired
    private KitService service;

    public Kit save(Kit kit) {
        return service.save(kit);
    }

    public Kit getById(Long id) {
        return service.getById(id);
    }

    public List<Kit> getAll() {
        return service.getAll();
    }

    public Kit update(Long id, Kit kit) {
        return service.update(id, kit);
    }

    public void delete(Long id) {
        service.delete(id);
    }
}
