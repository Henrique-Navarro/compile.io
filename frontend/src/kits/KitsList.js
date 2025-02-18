import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchKits from "../hooks/useFetchKits";
import LevelIndicator from "../layout/components/LevelIndicator";
import useUserProfile from "../hooks/useUserProfile";
import ProgressBar from "../layout/components/ProgressBar";
import KitInfo from "./KitInfo";
import Title from "../layout/components/Title";

const KitsList = () => {
  const { kits, loading, error } = useFetchKits();
  const navigate = useNavigate();
  const { profile, isLoading, errorMessage } = useUserProfile(1);

  if (loading) {
    return <></>;
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
    kitTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#e2e8f0",
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
    },
  };
  function getCompletedQuestions(kit) {
    let questionsSolved = profile?.questionsSolved || [];
    let completedQuestions = kit.questions.filter((question) =>
      questionsSolved.includes(question)
    ).length;

    return completedQuestions;
  }

  return (
    <div style={styles.mainContainer}>
      {kits.map((kit) => {
        let completedQuestions = getCompletedQuestions(kit);

        return (
          <div key={kit.id} style={styles.kitBox}>
            <KitInfo category={kit.category} duration={kit.duration} />
            <h1 style={styles.kitTitle}>{kit.name}</h1>
            <LevelIndicator level={kit.level} category={kit.category} />
            <ProgressBar
              max={kit.questions.length}
              current={completedQuestions}
            />
            <button
              style={styles.button}
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
