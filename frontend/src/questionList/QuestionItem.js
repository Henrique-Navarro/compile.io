import React from "react";
import { Link } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import { FaCheckCircle } from "react-icons/fa";
import LevelIndicator from "../layout/components/LevelIndicator";
import QuestionButton from "../question/QuestionButton";
import Title from "../layout/components/Title";
import Span from "../layout/components/Span";

const getLevelStyle = (level) => {
  if (!level) return "ADVANCED";
  return level.toUpperCase();
};

const QuestionItem = ({ question, showDetails = true }) => {
  const { profile, isLoading, errorMessage } = useUserProfile(1);
  const questionsSolved = profile?.questionsSolved || [];
  const isSolved = questionsSolved.includes(question.id);

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
      width: showDetails ? "70%" : "100%",
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
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    },
    actions: {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem",
    },
    a: {
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    },
  };

  return (
    <div style={styles.questionBox} className="question-box">
      <div style={styles.questionHeader}>
        <div style={styles.questionInfo}>
          <Title text={question.title} />
          <p style={styles.difficultyInfo}>
            <LevelIndicator level={question.level} />
            <Span title={"Max Score: "} text={question.points} />
          </p>
          {showDetails ? (
            <p style={styles.description}>{question.description}</p>
          ) : (
            <></>
          )}
        </div>
        <div style={styles.actions}>
          <QuestionButton isSolved={isSolved} questionId={question.id} />
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
