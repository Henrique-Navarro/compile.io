package api.ide.backend.question.repository;

import api.ide.backend.question.model.BaseCode;
import api.ide.backend.question.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseCodeRepository extends JpaRepository<BaseCode, Long> {

    @Modifying
    @Query("DELETE FROM BaseCode b WHERE b.question = :question")
    void deleteAllByQuestion(Question question);
}
