import Paragraph from "../layout/components/Paragraph";
import Title from "../layout/components/Title";
import AchievementsBox from "./AchievementsBox";
import ProgressBar from "./ProgressBar";
import TierLabel from "./TierLabel";

const ProgressColumn = ({ profile }) => {
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
  //const points = 249;
  const points = profile.points;
  let { progress, nextTierPoints } = calculateTierProgress(profile.points);

  const styles = {
    rightColumn: {
      width: "70%",
      backgroundColor: "rgb(32,36,44)",
      padding: "1.5rem",
      borderRadius: "0.75rem",
    },
  };

  return (
    <div style={styles.rightColumn}>
      <div style={styles.userInfoBox}>
        <Title text={"Progresso do Usuário"} bold={false} />
        <div>
          <Paragraph text={`Pontos: ${profile.points}`} />
          <p>
            <AchievementsBox achievements={profile.achievements} />
          </p>
        </div>
        <TierLabel points={points} tier={profile.tier} />
      </div>
      <ProgressBar points={points} tier={profile.tier} />
    </div>
  );
};

export default ProgressColumn;
