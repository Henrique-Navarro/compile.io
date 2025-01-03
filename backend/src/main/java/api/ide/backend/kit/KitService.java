package api.ide.backend.kit;

import api.ide.backend.kit.exception.KitNotFoundException;
import api.ide.backend.question.repository.QuestionRepository;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KitService {

    @Autowired
    private KitRepository repository;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuestionRepository questionRepository;

    public List<Kit> getAll() {
        return repository.findAll();
    }

    public Kit getById(Long id) {
        try {
            return repository.findById(id)
                    .orElseThrow(() -> new KitNotFoundException(id));
        } catch (KitNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public Kit save(Kit kit) {
        return repository.save(kit);
    }

    public Kit update(Long id, Kit kit) {
        Kit existingKit = getById(id);

        existingKit.setName(kit.getName());
        existingKit.setLevel(kit.getLevel());
        existingKit.setCategory(kit.getCategory());
        existingKit.setQuestions(kit.getQuestions());
        existingKit.setDuration(kit.getDuration());

        return repository.save(existingKit);
    }

    public void delete(Long id) {
        Kit kit = getById(id);
        repository.delete(kit);
    }
}
