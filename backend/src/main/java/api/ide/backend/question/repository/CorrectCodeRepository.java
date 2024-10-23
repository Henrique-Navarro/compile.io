package api.ide.backend.question.repository;

import api.ide.backend.question.dao.CorrectCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorrectCodeRepository extends JpaRepository<CorrectCode, Long> {
}