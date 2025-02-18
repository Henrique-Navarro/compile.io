import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const QuestionButton = ({ isSolved, questionId }) => {
  const styles = {
    checkButton: {
      backgroundColor: "#48bb78",
      color: "#f7fafc",
      fontSize: "1.25rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    roundButton: {
      width: "9.3rem",
      borderRadius: "0.5rem",
    },
    solveButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#38a169",
      color: "#f7fafc",
      fontWeight: "600",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    solveButtonHover: {
      backgroundColor: "#2f855a",
    },
    checkIcon: {
      color: "white",
      fontSize: "1.45rem",
    },
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = styles.solveButtonHover.backgroundColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = styles.solveButton.backgroundColor;
  };

  return (
    <Link to={`/questions/get/${questionId}`}>
      {isSolved ? (
        <button
          style={{
            ...styles.checkButton,
            ...styles.roundButton,
          }}
          title="Solved"
        >
          <FaCheckCircle style={styles.checkIcon} />
        </button>
      ) : (
        <button
          style={styles.solveButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          title="Solve"
        >
          Solve Challenge
        </button>
      )}
    </Link>
  );
};

export default QuestionButton;
