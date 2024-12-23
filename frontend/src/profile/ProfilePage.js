import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import Achievement from "./Achievement";
import AchievementsBox from "./AchievementsBox";

const ProfilePage = () => {
  const { userId } = useParams();
  const { profile, isLoading, errorMessage } = useUserProfile(userId);

  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!profile) {
    return <div>Usuário não encontrado.</div>;
  }

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

  let { progress, nextTierPoints } = calculateTierProgress(30);
  progress = 30;
  const styles = {
    container: {
      maxWidth: "960px",
      margin: "0 auto",
      padding: "1.5rem",
      color: "#f7fafc", // Cor clara para texto sobre fundo escuro
      backgroundColor: "#2d3748", // Fundo escuro para a div principal
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    },
    userInfoBox: {
      backgroundColor: "#1a202c", // Fundo escuro para o bloco de informações
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    },
    userInfoHeader: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#e2e8f0", // Texto mais claro para destacar o título
      marginBottom: "0.5rem",
    },
    userInfoText: {
      marginTop: "0.75rem",
      fontSize: "14px",
      color: "#cbd5e0", // Texto em tom mais suave para boa leitura
    },
    progressContainer: {
      height: "35px",
      backgroundColor: "#4a5568", // Cor escura para a barra de progresso
      width: "100%",
      borderRadius: "50px",
      position: "relative",
      cursor: "pointer",
      marginTop: "1rem",
    },
    progressBar: {
      width: `${progress}%`,
      height: "35px",
      backgroundColor: "#38a169", // Cor verde para progresso
      borderRadius: "50px",
      transition: "width 0.5s ease-in-out",
    },
    progressText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#f7fafc", // Cor clara para o texto dentro da barra
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
    achievementList: {
      marginTop: "0.5rem",
      fontSize: "14px",
      color: "#cbd5e0",
      justifyContent: "space-between",
    },
  };

  const simulatedAchievements = [
    {
      title: "First Steps",
      description: "Complete your first programming challenge.",
    },
    {
      title: "Java Master",
      description: "Solve 10 challenges using Java.",
    },
    {
      title: "Bug Hunter",
      description: "Find and fix 5 bugs in your code.",
    },
    {
      title: "Code Guru",
      description: "Achieve a perfect score on a challenge.",
    },
    {
      title: "Night Owl",
      description: "Submit a solution past midnight.",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Perfil de {profile.name}
      </h1>
      <div style={styles.userInfoBox}>
        <h2 style={styles.userInfoHeader}>Informações do Usuário</h2>
        <div style={styles.userInfoText}>
          <p>
            <strong>Nome:</strong> {profile.name}
          </p>
          <p>
            <strong>Pontos:</strong> 30
          </p>
          <p>
            <AchievementsBox achievements={simulatedAchievements} />
          </p>
          <p>
            <strong>Tier:</strong> {profile.tier}
          </p>
        </div>
        <p>
          Você está {progress.toFixed(2)}% do próximo tier ({profile.tier} para
          o próximo tier de {nextTierPoints} pontos)
        </p>
      </div>

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
          Você já alcançou {progress.toFixed(2)}% do tier {profile.tier},
          consiga mais {nextTierPoints - 30} para avançar.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
