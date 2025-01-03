package api.ide.backend.submit_history;

public class SubmitHistoryNotFoundException extends Exception {
    public SubmitHistoryNotFoundException(Long id) {
        super("Submit history with ID " + id + " not found.");
    }
}
