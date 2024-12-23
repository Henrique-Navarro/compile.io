package api.ide.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Name is required")
    private String name;

    @Column(unique = true, nullable = false)
    @NotEmpty(message = "Email is required")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "Password is required")
    private String password;

    private int points = 0;
    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean emailVerified = false;

    @Enumerated(EnumType.STRING)
    private AccountStatus status = AccountStatus.ACTIVE;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Tier tier = Tier.BRONZE;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_achievements", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Achievement> achievements = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> questionsSolved;

    public User(Long id, String name, String email, String password, int points, Role role, boolean emailVerified, AccountStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        //questions solved
        this.points = points;
        this.role = role;
        this.emailVerified = emailVerified;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public User() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getQuestionsSolved() {
        return questionsSolved;
    }

    public void setQuestionsSolved(List<Long> questionsSolved) {
        this.questionsSolved = questionsSolved;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == Role.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void updateTier() {
        if (points < 30) {
            this.tier = Tier.BRONZE;
        } else if (points < 100) {
            this.tier = Tier.SILVER;
        } else if (points < 250) {
            this.tier = Tier.GOLD;
        } else {
            this.tier = Tier.PLATINUM;
        }
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Tier getTier() {
        return tier;
    }

    public void setTier(Tier tier) {
        this.tier = tier;
    }

    public Set<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(Set<Achievement> achievements) {
        this.achievements = achievements;
    }

    public void addAchievement(Achievement achievement) {
        this.achievements.add(achievement);
    }

    public enum Role {
        ADMIN, USER
    }

    public enum AccountStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }

    // CHAMAR ESSE MÉTODO EM SUBMIT
    public void notifyAchievement() {
        if (this.questionsSolved.size() >= 5) {
            if (!this.achievements.contains(Achievement.FIVE_MATH_QUESTIONS)) {
                this.addAchievement(Achievement.FIVE_MATH_QUESTIONS);
            }
        }
        if (this.questionsSolved.size() >= 10) {
            if (!this.achievements.contains(Achievement.TEN_MATH_QUESTIONS)) {
                this.addAchievement(Achievement.TEN_MATH_QUESTIONS);
            }
        }
        if (!this.achievements.contains(Achievement.FIRST_CODE_SUBMISSION)) {
            this.addAchievement(Achievement.FIRST_CODE_SUBMISSION);
        }
    }

    public enum Tier {
        BRONZE, SILVER, GOLD, PLATINUM
    }

    public enum Achievement {
        FIVE_MATH_QUESTIONS("Solve 5 math questions"),
        TEN_MATH_QUESTIONS("Solve 10 math questions"),
        FIRST_CODE_SUBMISSION("Submit your first code"),
        PERFECT_SCORE("Achieve a perfect score on a question");

        private final String description;

        Achievement(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }
}

