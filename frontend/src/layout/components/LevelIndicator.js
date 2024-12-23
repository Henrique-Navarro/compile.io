import React from "react";

const getDifficultyStyle = (level) => {
  const styles = {
    INITIAL: { color: "#48bb78", text: "INITIAL" },
    INTERMEDIATE: { color: "#f6ad55", text: "INTERMEDIATE" },
    ADVANCED: { color: "#e53e3e", text: "ADVANCED" },
  };

  return styles[level.toUpperCase()] || styles.ADVANCED;
};

const LevelIndicator = ({ level }) => {
  const { color, text } = getDifficultyStyle(level);

  return (
    <span style={{ fontWeight: "600", marginRight: "0.5rem", color }}>
      {text}
    </span>
  );
};

export default LevelIndicator;
