import { FaArrowLeft } from "react-icons/fa"; // Importar o ícone de setinha de voltar
import { Link } from "react-router-dom";

const Back = ({ route }) => {
  const styles = {
    backButton: {
      position: "absolute",
      top: "0.5rem",
      left: "-3rem",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgb(32,36,44)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    backButtonIcon: {
      color: "white",
      fontSize: "1.25rem",
    },
    backButtonHover: {
      backgroundColor: "#cbd5e0",
    },
  };
  return (
    <Link to={route} style={styles.backButton}>
      <FaArrowLeft style={styles.backButtonIcon} />
    </Link>
  );
};

export default Back;
