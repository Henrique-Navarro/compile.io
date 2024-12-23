import React from "react";
import { FaTrophy, FaCode, FaBug, FaStar, FaMoon } from "react-icons/fa";

const Achievement = ({ achievement }) => {
  const styles = {
    container: {
      backgroundColor: "#4A5568",
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

  const icons = {
    "First Steps": <FaTrophy style={styles.icon} />,
    "Java Master": <FaCode style={styles.icon} />,
    "Bug Hunter": <FaBug style={styles.icon} />,
    "Code Guru": <FaStar style={styles.icon} />,
    "Night Owl": <FaMoon style={styles.icon} />,
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={styles.iconContainer}>
        {icons[achievement.title] || <FaTrophy style={styles.icon} />}
      </div>
      <div>
        <h3 style={styles.title}>{achievement.title}</h3>
        <p style={styles.description}>{achievement.description}</p>
      </div>
    </div>
  );
};

export default Achievement;
