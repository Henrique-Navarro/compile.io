import React, { useState } from "react";
import {
  FaTrophy,
  FaCode,
  FaBug,
  FaStar,
  FaMoon,
  FaChevronDown,
} from "react-icons/fa";
import Achievement from "./Achievement";

const AchievementsBox = ({ achievements }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={styles.box}>
      <div style={styles.header} onClick={toggleVisibility}>
        <h2 style={styles.boxTitle}>Conquistas</h2>
        <FaChevronDown
          style={{
            ...styles.toggleIcon,
            transform: isVisible ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>
      <div
        style={{
          ...styles.achievementsContainer,
          height: isVisible ? "auto" : "0",
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        {isVisible &&
          achievements.map((achievement, index) => (
            <Achievement key={index} achievement={achievement} />
          ))}
      </div>
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: "#2a2e38",
    // backgroundColor: "rgb(32,36,44)",
    borderRadius: "0.75rem",
    padding: "1rem",
    color: "#e2e8f0",
    marginBottom: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  boxTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  toggleIcon: {
    fontSize: "1.5rem",
    transition: "transform 0.3s ease",
  },
  achievementsContainer: {
    marginTop: "1rem",
  },
};

export default AchievementsBox;
