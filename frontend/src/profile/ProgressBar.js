import React, { useState, useEffect } from "react";

const ProgressBar = ({ tier, points }) => {
  const [isHovered, setIsHovered] = useState(false);

  const calculateTierProgress = (points) => {
    let nextTierPoints = 0;
    let progress = 0;

    if (points < 30) {
      nextTierPoints = 30;
      progress = (points / 30) * 100;
    } else if (points < 100) {
      nextTierPoints = 100;
      progress = ((points - 30) / (100 - 30)) * 100;
    } else if (points < 250) {
      nextTierPoints = 250;
      progress = ((points - 100) / (250 - 100)) * 100;
    } else {
      nextTierPoints = 1000;
      progress = ((points - 250) / (1000 - 250)) * 100;
    }

    progress = Math.min(progress, 100);
    return { progress, nextTierPoints };
  };
  points = 650;
  points = 249;
  points = 99;
  points = 29;
  let { progress, nextTierPoints } = calculateTierProgress(points);

  const getBoxShadow = (points) => {
    if (points < 30) {
      return "0 0 3px rgba(176, 78, 56, 0.5), 0 0 5px rgba(176, 78, 56, 0.3)";
    } else if (points < 100) {
      return "0 0 3px rgba(192, 192, 192, 0.5), 0 0 5px rgba(192, 192, 192, 0.3)";
    } else if (points < 250) {
      return "0 0 3px rgba(192, 192, 192, 0.5), 0 0 5px rgba(192, 192, 192, 0.3)";
    } else {
      return "0 0 3px rgba(0, 255, 255, 0.5), 0 0 5px rgba(0, 255, 255, 0.3)";
    }
  };

  const getProgressBarColor = (points) => {
    if (points < 30) {
      return "linear-gradient(45deg, #b04e38, #9e3c2b, #b04e38)";
    } else if (points < 100) {
      return "linear-gradient(45deg, #c0c0c0, #a8a8a8, #c0c0c0)";
    } else if (points < 250) {
      return "linear-gradient(45deg, #ffd700, #f1c27d, #ffd700)";
    } else {
      return "linear-gradient(45deg, #03adf5, #0288d1, #03adf5)";
    }
  };

  const styles = {
    progressContainer: {
      height: "35px",
      backgroundColor: "#4a5568",
      width: "100%",
      borderRadius: "50px",
      position: "relative",
      cursor: "pointer",
      marginTop: "1rem",
    },
    progressBar: {
      width: `${progress}%`,
      height: "35px",
      background: getProgressBarColor(points),
      borderRadius: "50px",
      transition: "width 0.5s ease-in-out",
      boxShadow: getBoxShadow(points),
    },
    progressText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#f7fafc",
      fontWeight: "bold",
      fontSize: "16px",
    },
    tooltip: {
      position: "absolute",
      top: "-45px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#333",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "5px",
      fontSize: "0.9rem",
      display: isHovered ? "block" : "none",
      whiteSpace: "nowrap",
    },
  };
  return (
    <>
      <p>
        Você está {progress.toFixed(2)}% do próximo tier ({tier} para o próximo
        tier de {nextTierPoints} pontos)
      </p>
      <div
        style={styles.progressContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="progress-bar"
          role="progressbar"
          style={styles.progressBar}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div style={styles.progressText}>{progress.toFixed(2)}%</div>
        <div style={styles.tooltip}>
          Você já alcançou {progress.toFixed(2)}% do tier {tier}, consiga mais{" "}
          {nextTierPoints - 30} para avançar.
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
