package api.ide.backend.question.repository;

import api.ide.backend.question.dao.BaseCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseCodeRepository extends JpaRepository<BaseCode, Long> {
}
