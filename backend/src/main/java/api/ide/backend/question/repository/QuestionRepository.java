package api.ide.backend.question.repository;

import api.ide.backend.question.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    /*@Modifying
    @Transactional
    @Query(value = "INSERT INTO questao (title, enunciado, input_example, output_example, base_code_id, testes_id) " +
            "VALUES (:title, :enunciado, :input_example, :output_example, :base_code_id, :testes_id)", nativeQuery = true)
    void save(@Param("title") String title,
                        @Param("enunciado") String enunciado,
                        @Param("input_example") String inputExample,
                        @Param("output_example") String outputExample,
                        @Param("base_code_id") Long base_code_id,
                        @Param("testes_id") Long testes_id);*/


}
