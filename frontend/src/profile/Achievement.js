import React from "react";
import { FaTrophy, FaCode, FaBug, FaStar, FaMoon } from "react-icons/fa";

const Achievement = ({ achievement }) => {
  const styles = {
    container: {
      backgroundColor: "#4A5568",
      // backgroundColor: "#3e4550",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
      width: "97.5%",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      paddingLeft: "1rem",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    containerHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    },
    iconContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "50%",
      padding: "0.75rem",
      marginRight: "1rem",
      color: "#2ccc64", // cor do ícone
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "4rem",
      height: "4rem",
    },
    icon: {
      fontSize: "1.5rem", // tamanho dos ícones
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#e2e8f0",
      marginBottom: "0.25rem",
    },
    description: {
      fontSize: "14px",
      color: "#cbd5e0",
    },
  };
  const description = {
    FIVE_MATH_QUESTIONS: "Solve 5 math questions",
    TEN_MATH_QUESTIONS: "Solve 10 math questions",
    FIRST_CODE_SUBMISSION: "Submit your first code",
    PERFECT_SCORE: "Achieve a perfect score on a question",
    Night_Owl: <FaMoon style={styles.icon} />,
  };
  const title = {
    FIVE_MATH_QUESTIONS: "Five math questions",
    TEN_MATH_QUESTIONS: "Ten math questions",
    FIRST_CODE_SUBMISSION: "First code submission",
    PERFECT_SCORE: "Perfect score",
    Night_Owl: <FaMoon style={styles.icon} />,
  };
  const icons = {
    FIVE_MATH_QUESTIONS: <FaTrophy style={styles.icon} />,
    TEN_MATH_QUESTIONS: <FaCode style={styles.icon} />,
    FIRST_CODE_SUBMISSION: <FaBug style={styles.icon} />,
    PERFECT_SCORE: <FaStar style={styles.icon} />,
    Night_Owl: <FaMoon style={styles.icon} />,
  };
  console.log(achievement);
  return (
    <div
      style={styles.container}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={styles.iconContainer}>
        {icons[achievement] || <FaTrophy style={styles.icon} />}
      </div>
      <div>
        <h3 style={styles.title}>{title[achievement]}</h3>
        <p style={styles.description}>{description[achievement]}</p>
      </div>
    </div>
  );
};

export default Achievement;
