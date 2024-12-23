package api.ide.backend.kit;

import api.ide.backend.enums.Category;
import api.ide.backend.enums.Level;

import java.util.List;

public class KitRequest {
    private String name;
    private Level level;
    private Category category;
    private List<Long> questionIds;
    private Long duration;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Long> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<Long> questionIds) {
        this.questionIds = questionIds;
    }
}

