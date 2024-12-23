package api.ide.backend.submit_history;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmitHistoryRepository extends JpaRepository<SubmitHistory, Long> {

    List<SubmitHistory> findByUserId(Long userId);
}
