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

  const styles = {
    mainContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: "#2d3748",
      color: "#f7fafc",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
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
    kitInfo: {
      fontSize: "14px",
      color: "#cbd5e0",
    },
    levelIndicator: (level) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: getLevelColor(level),
      marginRight: "0.5rem",
    }),
    categoryAndLevel: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    questionList: {
      listStyleType: "none",
      paddingLeft: "0",
      marginTop: "1rem",
    },
    questionItem: {
      backgroundColor: "#4a5568",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem",
      transition: "background-color 0.3s",
    },
    questionItemHover: {
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
      <ul style={styles.questionList}>
        <strong>Questions:</strong>
        {Array.isArray(kit.questions) ? (
          kit.questions.map((questionId) => (
            <QuestionItem key={questionId} questionId={questionId} />
          ))
        ) : (
          <li>No questions available</li>
        )}
      </ul>
    </div>
  );
};

const QuestionItem = ({ questionId }) => {
  const { question, loading, error } = useFetchQuestion(questionId);
  const styles = {
    questionItem: {
      backgroundColor: "#4a5568",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem",
      transition: "background-color 0.3s",
    },
    questionItemHover: {
      backgroundColor: "#2b6cb0",
    },
    questionLink: {
      textDecoration: "none",
      color: "#e2e8f0",
      fontWeight: "bold",
      display: "block",
    },
  };

  if (loading) {
    return <li style={styles.questionItem}>Loading...</li>;
  }

  if (error || !question) {
    return null;
  }

  return (
    <li
      style={styles.questionItem}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor =
          styles.questionItemHover.backgroundColor)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor =
          styles.questionItem.backgroundColor)
      }
    >
      <Link to={`/questions/get/${questionId}`} style={styles.questionLink}>
        {question.title}
      </Link>
    </li>
  );
};

export default Kit;
