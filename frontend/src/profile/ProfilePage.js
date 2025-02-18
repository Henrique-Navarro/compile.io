import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import ProgressColumn from "./ProgressColumn";
import InfoColumn from "./InfoColumn";
import DetailsInfoColumn from "./DetailsInfoColumn";

const ProfilePage = () => {
  const { userId } = useParams();
  const { profile, isLoading, errorMessage } = useUserProfile(1); // Usando o userId dinâmico

  if (isLoading) {
    return <></>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!profile) {
    return <div>Usuário não encontrado.</div>;
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "1.5rem",
      color: "#f7fafc",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
      fontWeight: "100",
    },
    leftColumn: {
      width: "30%",
      marginRight: "2rem",
      borderRadius: "0.75rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    rightColumn: {
      width: "70%",
      backgroundColor: "rgb(32,36,44)",
      padding: "1.5rem",
      borderRadius: "0.75rem",
    },
    bioInput: {
      width: "100%",
      padding: "1rem 0 .8rem 0.5rem",
      marginBottom: "1rem",
      backgroundColor: "#2d3748",
      border: "1px solid #4a5568",
      borderRadius: "0.75rem",
      color: "#f7fafc",
      fontSize: "16px",
      resize: "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <InfoColumn profile={profile} />

        <DetailsInfoColumn profile={profile} />
      </div>

      <ProgressColumn profile={profile} />
    </div>
  );
};

export default ProfilePage;
