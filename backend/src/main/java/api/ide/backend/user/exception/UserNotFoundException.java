package api.ide.backend.user.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(Long id) {
        super("User with ID " + id + " not found.");
    }
}
