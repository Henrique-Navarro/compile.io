const TierLabel = ({ tier, points }) => {
  const getTierColor = (points) => {
    if (points < 30) {
      return "#b04e38"; // Cor para bronze
    } else if (points < 100) {
      return "#c0c0c0"; // Cor para prata
    } else if (points < 250) {
      return "#ffd700"; // Cor para ouro
    } else {
      return "#03adf5"; // Cor para diamante
    }
  };

  const styles = {
    tierStyle: {
      color: getTierColor(points),
    },
  };

  return (
    <p>
      <strong>Tier: </strong>
      <span style={styles.tierStyle}>{tier}</span>
    </p>
  );
};

export default TierLabel;
