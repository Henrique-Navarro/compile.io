import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchKits from "../hooks/useFetchKits";
import LevelIndicator from "../layout/components/LevelIndicator";

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

// COPIAR: https://www.hackerrank.com/dashboard
// colocar icone bonitinho no cantinho, tempo, barra de progresso

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
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: "#2d3748",
      color: "#f7fafc",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    },
    kitBox: {
      backgroundColor: "#4a5568",
      padding: "1rem",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
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
    button: {
      backgroundColor: "#4299e1",
      color: "#fff",
      border: "none",
      borderRadius: "0.25rem",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      fontWeight: "bold",
      alignSelf: "flex-start",
    },
  };

  return (
    <div style={styles.mainContainer}>
      {kits.map((kit) => (
        <div key={kit.id} style={styles.kitBox}>
          <h1 style={styles.kitTitle}>{kit.name}</h1>
          <LevelIndicator level={kit.level} category={kit.category} />
          <button
            style={styles.button}
            onClick={() => navigate(`/kits/get/${kit.id}`)}
          >
            View Kit
          </button>
        </div>
      ))}
    </div>
  );
};

export default KitsList;
