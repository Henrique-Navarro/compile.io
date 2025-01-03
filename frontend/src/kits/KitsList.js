import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchKits from "../hooks/useFetchKits";
import LevelIndicator from "../layout/components/LevelIndicator";
import { FaClock, FaStopwatch } from "react-icons/fa"; // Novo ícone de relógio

// Função para determinar a cor da bolinha de nível
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

const KitsList = () => {
  const { kits, loading, error } = useFetchKits();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles = {
    mainContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(49%, 1fr))",
      gap: "3rem 1.5rem",
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "1.5rem",
      color: "#f7fafc",
      fontFamily: "serif",
      borderRadius: "0.75rem",
    },
    kitBox: {
      position: "relative",
      backgroundColor: "rgb(32,36,44)",
      padding: "1rem",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    kitBoxHover: {
      transform: "scale(1.03)",
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
    },
    kitTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
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
    progressBarContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "5px",
      overflow: "hidden",
      height: "5px",
      marginTop: "0.5rem",
    },
    progressBar: (progress) => ({
      height: "100%",
      width: `${progress}%`,
      backgroundColor: "white",
    }),
    progressPercentage: {
      marginTop: "0.5rem",
      fontSize: "0.875rem",
      color: "#a0aec0",
      textAlign: "center",
    },
    emblem: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#1a202c",
      color: "#e2e8f0",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "12px",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "transparent",
      color: "white",
      border: "0.5px solid white",
      borderRadius: "0.5rem",
      padding: "0.8rem 3rem",
      cursor: "pointer",
      fontWeight: "200",
      alignSelf: "flex-start",
      transition: "background-color 0.2s, color 0.2s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#4299e1",
      color: "#fff",
      transform: "scale(1.05)",
    },
    duration: {
      fontSize: "14px",
      color: "#cbd5e0",
      display: "flex",
      alignItems: "center",
      marginTop: "0.5rem",
    },
    clockIcon: {
      marginRight: "0.5rem",
      fontSize: "15px",
    },
    durationContainer: {
      position: "absolute",
      top: "10px",
      right: "80px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1a202c",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      color: "#e2e8f0",
      fontSize: "12px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.mainContainer}>
      {kits.map((kit) => {
        const resolvedQuestions = kit.resolvedQuestions || 0;
        const totalQuestions = kit.totalQuestions || 1; // Evitar divisão por zero
        const progress = Math.round((resolvedQuestions / totalQuestions) * 100);

        return (
          <div
            key={kit.id}
            style={styles.kitBox}
            onMouseEnter={(e) => e.currentTarget.classList.add("hoverEffect")}
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove("hoverEffect")
            }
            className="hoverEffect"
          >
            <div style={styles.emblem}>{kit.category}</div>
            <div style={styles.durationContainer}>
              <FaStopwatch style={styles.clockIcon} />
              {kit.duration} minutes
            </div>
            <h1 style={styles.kitTitle}>{kit.name}</h1>
            <LevelIndicator level={kit.level} category={kit.category} />
            <div style={styles.progressBarContainer}>
              <div style={styles.progressBar(progress)}></div>
            </div>
            <div style={styles.progressPercentage}>{progress}% completed</div>
            <button
              style={styles.button}
              onMouseEnter={(e) =>
                e.currentTarget.classList.add("hoverEffectButton")
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove("hoverEffectButton")
              }
              onClick={() => navigate(`/kits/get/${kit.id}`)}
            >
              View Kit
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default KitsList;
