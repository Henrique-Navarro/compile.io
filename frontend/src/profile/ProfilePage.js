import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import Achievement from "./Achievement";
import AchievementsBox from "./AchievementsBox";
import { FaPen } from "react-icons/fa";
import Avatar from "react-avatar";
import Select from "react-select";
import countryList from "react-select-country-list";

const ProfilePage = () => {
  const { userId } = useParams();
  const { profile, isLoading, errorMessage } = useUserProfile(6);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile ? profile.biografy : "");
  const [location, setLocation] = useState(profile ? profile.location : "");
  const [phoneNumber, setPhoneNumber] = useState(
    profile ? profile.phoneNumber : ""
  );
  const [country, setCountry] = useState(null);
  const countryOptions = countryList().getData();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("profile", profile);
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!profile) {
    return <div>Usuário não encontrado.</div>;
  }

  const handleSave = () => {
    setIsEditing(false);
    console.log("Dados salvos:", { bio, location, phoneNumber, country });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBio(profile.biografy);
    setLocation(profile.location);
    setPhoneNumber(profile.phoneNumber);
    setCountry(null);
  };

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
    avatarContainer: {
      position: "relative",
      display: "inline-block",
    },
    avatarEditIcon: {
      position: "absolute",
      bottom: "5px",
      left: "90px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "18px",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "1.5rem",
      color: "#f7fafc",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    },
    leftColumn: {
      width: "30%",
      marginRight: "2rem",
      backgroundColor: "rgb(32,36,44)",
      padding: "1.5rem",
      borderRadius: "0.75rem",
    },
    rightColumn: {
      width: "70%",
      backgroundColor: "rgb(32,36,44)",
      padding: "1.5rem",
      borderRadius: "0.75rem",
    },
    bioInput: {
      width: "90%",
      padding: "1rem",
      backgroundColor: "#2d3748",
      border: "1px solid #4a5568",
      borderRadius: "0.75rem",
      color: "#f7fafc",
      fontSize: "14px",
      resize: "none",
    },
    buttonContainer: {
      marginTop: "1rem",
      display: "flex",
      gap: "1rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.75rem",
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "#38a169",
      color: "#fff",
    },
    cancelButton: {
      backgroundColor: "#e53e3e",
      color: "#fff",
    },
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
      //width: ${progress}%,
      width: "30%",
      height: "35px",
      backgroundColor: "#38a169",
      borderRadius: "50px",
      transition: "width 0.5s ease-in-out",
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
    countryFlag: {
      width: "24px",
      height: "16px",
      marginLeft: "10px",
      cursor: "pointer",
    },
    nameWithFlag: {
      display: "flex",
      alignItems: "center",
    },
    countrySelect: {
      control: (base) => ({
        ...base,
        color: "black", // Cor do texto no controle
      }),
      option: (base) => ({
        ...base,
        color: "black", // Cor do texto das opções
      }),
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <div style={styles.avatarContainer}>
          <Avatar name={profile.name} size="100" round={true} color="#38a169" />
          <FaPen
            style={styles.avatarEditIcon}
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>
        <div style={styles.nameWithFlag}>
          <h2>{profile.name}</h2>
          {profile.location && (
            <img
              src={`https://flagcdn.com/w40/${profile.location.toLowerCase()}.png`}
              alt={`${profile.location}`}
              style={styles.countryFlag}
              title={profile.location}
            />
          )}
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={profile.biography}
              onChange={(e) => setBio(e.target.value)}
              style={styles.bioInput}
              placeholder="Edit your biography..."
            />
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.bioInput}
              placeholder="Edit your location..."
            />
            <input
              type="text"
              value={profile.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={styles.bioInput}
              placeholder="Edit your phone number..."
            />
            <Select
              options={countryOptions}
              value={country}
              onChange={setCountry}
              placeholder="Select your country"
              styles={styles.countrySelect}
            />
            <div style={styles.buttonContainer}>
              <button
                onClick={handleSave}
                style={{ ...styles.button, ...styles.saveButton }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{ ...styles.button, ...styles.cancelButton }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <pre>{profile.biography || "Not provided"}</pre>
            <p>
              <strong>Phone Number: </strong>
              {profile.phoneNumber || "Not provided"}
            </p>
          </div>
        )}
      </div>
      <div style={styles.rightColumn}>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Perfil de {profile.name}
        </h1>
        <div style={styles.userInfoBox}>
          <h2 style={styles.userInfoHeader}>Progresso do Usuário</h2>
          <div style={styles.userInfoText}>
            <p>
              <strong>Nome:</strong> {profile.name}
            </p>
            <p>
              <strong>Pontos:</strong> 30
            </p>
            <p>
              <AchievementsBox achievements={profile.achievements} />
            </p>
            <p>
              <strong>Tier:</strong> {profile.tier}
            </p>
          </div>
          <p>
            Você está {progress.toFixed(2)}% do próximo tier ({profile.tier}{" "}
            para o próximo tier de {nextTierPoints} pontos)
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
    </div>
  );
};

export default ProfilePage;
