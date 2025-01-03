package api.ide.backend.user;

import api.ide.backend.user.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserService() {
    }

    public User save(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return repository.save(user);
    }

    public User update(Long id, User userDetails) {
        User existingUser = getById(id);

        existingUser.setName(userDetails.getName());
        existingUser.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(userDetails.getPassword());
            existingUser.setPassword(encodedPassword);
        }

        return repository.save(existingUser);
    }

    public User getById(Long id) {
        try {
            return repository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException(id));
        } catch (UserNotFoundException ignored) {
        }

        return null;
    }

    public boolean existsByEmail(String email) {
        return repository.findByEmail(email) != null;
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        User user = getById(id);
        repository.delete(user);
    }

    public void linkQuestion(Long userId, Long questionId, int points) {
        User user = getById(userId);

        if (!user.getQuestionsSolved().contains(questionId)) {
            /** add points **/
            user.addPoints(points);

            /** add question solved **/
            user.addQuestionSolved(questionId);

            /** add achievement **/
            user.notifyAchievement();

            /** check tier **/
            user.checkTier();

            repository.save(user);
        }
    }
}