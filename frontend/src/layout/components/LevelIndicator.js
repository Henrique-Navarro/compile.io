import React from "react";

const getDifficultyStyle = (level) => {
  const styles = {
    INITIAL: { color: "#48bb78", text: "INITIAL" },
    INTERMEDIATE: { color: "#f6ad55", text: "INTERMEDIATE" },
    ADVANCED: { color: "#e53e3e", text: "ADVANCED" },
  };

  const defaultStyle = {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: "500",
    marginRight: "0.5rem",
  };

  const style = styles[level.toUpperCase()];
  return {
    ...defaultStyle,
    color: style.color,
    text: style.text,
  };
};

const LevelIndicator = ({ level }) => {
  const { text, ...style } = getDifficultyStyle(level);

  return <span style={style}>{text}</span>;
};

export default LevelIndicator;
