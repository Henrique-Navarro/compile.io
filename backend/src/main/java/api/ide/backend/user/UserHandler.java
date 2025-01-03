package api.ide.backend.user;

import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.service.QuestionService;
import api.ide.backend.user.exception.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserHandler {

    @Autowired
    private UserService service;
    @Autowired
    private QuestionService questionService;

    public User save(User user) {
        if (service.existsByEmail(user.getEmail())) {
            try {
                throw new UserAlreadyExistsException(user.getEmail());
            } catch (UserAlreadyExistsException e) {
                throw new RuntimeException(e);
            }
        }

        return service.save(user);
    }

    public User update(Long id, User userDetails) {
        User existingUser = getById(id);

        if (userDetails.getName() != null) {
            existingUser.setName(userDetails.getName());
        }
        if (userDetails.getEmail() != null) {
            existingUser.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            existingUser.setPassword(userDetails.getPassword());
        }

        return service.update(userDetails.getId(), userDetails);
    }

    public User getById(Long id) {
        return service.getById(id);
    }

    public List<User> getAll() {
        return service.getAll();
    }

    public void delete(Long id) {
        service.delete(id);
    }

    public void linkQuestionToUser(CorrectionDTO correctionDTO) {
        Long questionId = correctionDTO.getQuestionId();
        Long userId = correctionDTO.getUserId();

        int maxPoints = questionService.getById(questionId).getPoints();
        int points = correctionDTO.getPoints();

        if (maxPoints == points) {
            service.linkQuestion(userId, questionId, points);
        }
    }
}
