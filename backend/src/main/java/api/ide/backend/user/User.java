package api.ide.backend.user;

import api.ide.backend.enums.Achievement;
import api.ide.backend.enums.Tier;
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

    private String location;
    private String phoneNumber;
    private String biography;

    public User(Long id, String name, String email, String password, int points, Role role, boolean emailVerified, AccountStatus status, LocalDateTime createdAt, LocalDateTime updatedAt, String location, String phoneNumber, String biography) {
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
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.biography = biography;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Tier getTier() {
        return tier;
    }

    public void setTier(Tier tier) {
        this.tier = tier;
    }


    public void setAchievements(Set<Achievement> achievements) {
        this.achievements = achievements;
    }

    public Set<Achievement> getAchievements() {
        return achievements;
    }

    public void addAchievement(Achievement achievement) {
        if (!this.getAchievements().contains(achievement)) {
            this.achievements.add(achievement);
        }
    }

    public void addPoints(int points) {
        this.setPoints(this.getPoints() + points);
    }

    public void addQuestionSolved(Long questionId) {
        this.getQuestionsSolved().add(questionId);
    }

    public void checkTier() {
        this.tier = Tier.getTierByPoints(this.getPoints());
    }

    public void notifyAchievement() {
        for (Achievement achievement : Achievement.getAll()) {
            boolean shouldAdd = Achievement.check(this, achievement);

            if (shouldAdd) {
                this.addAchievement(achievement);
            }
        }
    }

    public enum Role {
        ADMIN, USER
    }

    public enum AccountStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }
}

