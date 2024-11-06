package api.ide.backend.question.repository;

import api.ide.backend.question.model.Question;
import api.ide.backend.question.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    @Modifying
    @Query("DELETE FROM TestCase t WHERE t.question = :question")
    void deleteAllByQuestion(Question question);
}
