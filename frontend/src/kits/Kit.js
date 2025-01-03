import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCubes,
  FaFont,
  FaCalculator,
  FaListUl,
  FaSyncAlt,
  FaPlusCircle,
  FaQuestionCircle,
  FaExchangeAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import useFetchKit from "../hooks/useFetchKit";
import useFetchQuestion from "../hooks/useFetchQuestion";
import LevelIndicator from "../layout/components/LevelIndicator";

const categoryIcons = {
  POO: FaCubes,
  STRING: FaFont,
  MATH: FaCalculator,
  ARRAY: FaListUl,
  LOOPS: FaSyncAlt,
  OPERATIONS: FaPlusCircle,
  CONDITIONS: FaQuestionCircle,
  CONVERSIONS: FaExchangeAlt,
  NUMBERS: FaSortNumericDown,
};

const getLevelColor = (level) => {
  switch (level) {
    case "easy":
      return "green";
    case "medium":
      return "yellow";
    case "hard":
      return "red";
    default:
      return "gray";
  }
};

const Kit = () => {
  const { kitId } = useParams();
  const { kit, loading: kitLoading, error: kitError } = useFetchKit(kitId);

  if (kitLoading) {
    return <div>Loading...</div>;
  }

  if (kitError) {
    return <div>Error: {kitError}</div>;
  }

  const Icon = categoryIcons[kit.category] || FaCubes;

  const totalQuestions = kit.questions.length;
  const completedQuestions = kit.questions.filter((q) => q.completed).length;
  const progressPercentage = Math.round(
    (completedQuestions / totalQuestions) * 100
  );

  const styles = {
    mainContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: "#2d3748",
      color: "#f7fafc",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    },
    kitHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    kitIcon: {
      fontSize: "2rem",
      color: "#63b3ed",
    },
    kitTitle: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#e2e8f0",
    },
    progressContainer: {
      position: "relative",
      height: "20px",
      backgroundColor: "#4a5568",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "1rem",
    },
    progressBar: {
      height: "100%",
      width: `${progressPercentage}%`,
      backgroundColor: "#63b3ed",
      transition: "width 0.3s",
    },
    progressText: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#e2e8f0",
      fontSize: "14px",
      fontWeight: "bold",
    },
    questionListContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    questionCard: {
      backgroundColor: "#4a5568",
      padding: "1rem",
      borderRadius: "0.5rem",
      transition: "background-color 0.3s",
    },
    questionCardHover: {
      backgroundColor: "#2b6cb0",
    },
    questionLink: {
      textDecoration: "none",
      color: "#e2e8f0",
      fontWeight: "bold",
      display: "block",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.kitHeader}>
        <Icon style={styles.kitIcon} />
        <div>
          <h1 style={styles.kitTitle}>{kit.name}</h1>
          <LevelIndicator level={kit.level} category={kit.category} />
        </div>
      </div>
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}></div>
        <span style={styles.progressText}>{progressPercentage}% completed</span>
      </div>
      <div style={styles.questionListContainer}>
        {kit.questions.map((question) => (
          <div
            key={question.id}
            style={styles.questionCard}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.questionCardHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.questionCard.backgroundColor)
            }
          >
            <Link
              to={`/questions/get/${question.id}`}
              style={styles.questionLink}
            >
              {question.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kit;
