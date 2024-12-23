package api.ide.backend.kit;

import api.ide.backend.question.repository.QuestionRepository;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KitService {

    @Autowired
    private KitRepository kitRepository;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuestionRepository questionRepository;

    public List<Kit> findAll() {
        return kitRepository.findAll();
    }

    public Optional<Kit> findById(Long id) {
        return kitRepository.findById(id);
    }

    public Kit createKit(KitRequest kitRequest) {
        Kit kit = new Kit();
        kit.setName(kitRequest.getName());
        kit.setLevel(kitRequest.getLevel());
        kit.setCategory(kitRequest.getCategory());
        kit.setQuestions(kitRequest.getQuestionIds());
        kit.setDuration(kitRequest.getDuration());
        return kitRepository.save(kit);
    }

    public Kit updateKit(Long id, KitRequest kitRequest) {
        return kitRepository.findById(id)
                .map(existingKit -> {
                    existingKit.setName(kitRequest.getName());
                    existingKit.setLevel(kitRequest.getLevel());
                    existingKit.setCategory(kitRequest.getCategory());
                    existingKit.setQuestions(kitRequest.getQuestionIds());
                    existingKit.setDuration(kitRequest.getDuration());
                    return kitRepository.save(existingKit);
                })
                .orElseThrow(() -> new RuntimeException("Kit not found with id: " + id));
    }

    public void deleteById(Long id) {
        kitRepository.deleteById(id);
    }
}
