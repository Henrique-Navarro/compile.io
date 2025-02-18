import React, { useState, useEffect } from "react";

const ProgressBar = ({ max, current, color = "white", height = 5 }) => {
  const styles = {
    progressBarContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "5px",
      overflow: "hidden",
      height: `${height}px`,
      marginTop: "0.5rem",
    },
    progressBar: (progress) => ({
      height: "100%",
      width: `${progress}%`,
      backgroundColor: `${color}`,
    }),
    percentage: {
      marginTop: "0.5rem",
      fontSize: "0.875rem",
      color: "#a0aec0",
      textAlign: "center",
    },
  };

  let percentage = Math.round((current / max) * 100);
  percentage = isNaN(percentage) ? 0 : percentage;

  return (
    <>
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar(percentage)}></div>
      </div>
      <div style={styles.percentage}>{percentage}% completed</div>
    </>
  );
};

export default ProgressBar;
