import { FaClock, FaStopwatch } from "react-icons/fa"; // Novo ícone de relógio

const KitInfo = ({ category, duration }) => {
  const styles = {
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
      cursor: "pointer",
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
      cursor: "pointer",
    },
  };
  return (
    <>
      <div style={styles.emblem}>{category}</div>
      <div style={styles.durationContainer}>
        <FaStopwatch style={styles.clockIcon} />
        {duration} minutes
      </div>
    </>
  );
};

export default KitInfo;
