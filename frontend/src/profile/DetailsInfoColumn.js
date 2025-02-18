import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import Input from "../layout/components/Input";
import Title from "../layout/components/Title";
import Span from "../layout/components/Span";
import Paragraph from "../layout/components/Paragraph";

const DetailsInfoColumn = ({ profile }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setPhoneNumber(profile.phoneNumber || "");
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSaveDetails = () => {
    setIsEditing(false);

    const updatedProfileDetails = {
      ...profile,
      email: email,
      phoneNumber: phoneNumber,
    };

    // Simula uma requisição de salvamento (substituir por chamada ao backend)
    console.log("Detalhes atualizados:", updatedProfileDetails);
  };
  const handleCancelDetails = () => {
    setIsEditing(false);

    // Restaura os valores originais dos detalhes
    setEmail(profile.email || "");
    setPhoneNumber(profile.phoneNumber || "");
  };

  const styles = {
    detailsBox: {
      position: "relative",
      display: "inline-block",
      backgroundColor: "rgb(32,36,44)",
      padding: "1rem",
      borderRadius: "0.75rem",
    },
    detailsEditIcon: {
      position: "absolute",
      top: "20px",
      right: "20px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "18px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    saveButton: {
      backgroundColor: "#38a169",
      color: "#fff",
    },
    cancelButton: {
      backgroundColor: "#e53e3e",
      color: "#fff",
    },
  };

  return (
    <div style={styles.detailsBox}>
      <FaPen
        style={styles.detailsEditIcon}
        onClick={() => setIsEditing(!isEditing)}
      />
      <Title text={"Detalhes do Perfil"} bold={false} />
      {isEditing ? (
        <div>
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div style={styles.buttonContainer}>
            <button
              onClick={handleSaveDetails}
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Save
            </button>
            <button
              onClick={handleCancelDetails}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Paragraph text={`Email: ${profile.email}`} />
          <Paragraph text={`Phone Number: ${profile.phoneNumber}`} />
        </div>
      )}
    </div>
  );
};

export default DetailsInfoColumn;
