import React from "react";
import { Link } from "react-router-dom";

const getLevelStyle = (level) => {
  if (!level) return "ADVANCED";
  return level.toUpperCase();
};

const QuestionItem = ({ question }) => {
  const styles = {
    questionBox: {
      backgroundColor: "rgb(32,36,44)",
      borderRadius: "0.75rem",
      padding: "0.5rem 1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease",
      position: "relative",
      cursor: "pointer",
    },
    questionHeader: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    questionInfo: {
      fontSize: "14px",
      width: "70%",
    },
    questionTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#e2e8f0",
      marginBottom: "0.5rem",
    },
    difficultyInfo: {
      fontSize: "14px",
      color: "#cbd5e0",
    },
    difficulty: {
      fontWeight: "600",
      marginRight: "0.5rem",
    },
    difficultyInitial: {
      color: "#48bb78",
    },
    difficultyIntermediate: {
      color: "#f6ad55",
    },
    difficultyAdvanced: {
      color: "#e53e3e",
    },
    description: {
      color: "#cbd5e0",
      fontSize: "14px",
      marginTop: "0.75rem",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      WebkitLineClamp: 2,
      whiteSpace: "normal",
    },
    actions: {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem",
    },
    solveButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#38a169",
      color: "#f7fafc",
      color: "black",
      fontWeight: "200",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    solveButtonHover: {
      backgroundColor: "#2f855a",
    },
  };

  return (
    <div style={styles.questionBox} className="question-box">
      <div style={styles.questionHeader}>
        <div style={styles.questionInfo}>
          <h1 style={styles.questionTitle}>{question.title}</h1>
          <p style={styles.difficultyInfo}>
            <span
              style={{
                ...styles.difficulty,
                ...(getLevelStyle(question.level) === "INITIAL"
                  ? styles.difficultyInitial
                  : getLevelStyle(question.level) === "INTERMEDIATE"
                  ? styles.difficultyIntermediate
                  : styles.difficultyAdvanced),
              }}
            >
              {question.level || "ADVANCED"}
            </span>
            <span>Max Score: {question.points}</span>
          </p>
          <p style={styles.description}>{question.description}</p>
        </div>
        <div style={styles.actions}>
          <Link to={`/questions/get/${question.id}`}>
            <button
              style={styles.solveButton}
              className="solve-button"
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor =
                  styles.solveButtonHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  styles.solveButton.backgroundColor)
              }
            >
              Solve Challenge
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
