package api.ide.backend.kit.exception;

public class KitNotFoundException extends Exception {
    public KitNotFoundException(Long id) {
        super("Kit with ID " + id + " not found.");
    }
}
