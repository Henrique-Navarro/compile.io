package api.ide.backend.kit;

import api.ide.backend.enums.Category;
import api.ide.backend.enums.Level;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/// ADICIONAR ATRIBUTO TEMPO MÉDIO DE RESOLUÇÃO
@Entity
public class Kit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Enumerated(EnumType.STRING)
    private Category category;

    @ElementCollection
    @CollectionTable(name = "kit_questions", joinColumns = @JoinColumn(name = "kit_id"))
    @Column(name = "question_id")
    private List<Long> questions = new ArrayList<>();

    private Long duration;

    public Kit() {
    }

    public Kit(String name, Level level, Category category, List<Long> questions, Long duration) {
        this.name = name;
        this.level = level;
        this.category = category;
        this.questions = questions;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Long> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Long> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Kit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", level=" + level +
                ", category=" + category +
                ", questions=" + questions +
                '}';
    }
}