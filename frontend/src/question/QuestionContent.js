import React from "react";
import BlackLabel from "../layout/components/BlackLabel";
import LevelIndicator from "../layout/components/LevelIndicator";

const QuestionContent = ({ question }) => {
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

  const styles = {
    content: {
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
      fontWeight: "100",
    },
    paragraph: {
      fontWeight: "100",
      fontSize: "13px",
    },
    levelIndicator: (level) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: getLevelColor(level),
      marginRight: "0.5rem",
    }),
    categoryAndLevel: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    title: {
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    strong: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.content}>
      <LevelIndicator level={question.level} category={question.category} />

      <h2 style={styles.title}>{question.title}</h2>

      <strong style={styles.strong}>Objetivo:</strong>
      <p style={styles.paragraph}>{question.objective}</p>

      <strong style={styles.strong}>Descrição:</strong>
      <p style={styles.paragraph}>{question.description}</p>

      <strong style={styles.strong}>Tarefa:</strong>
      <p style={styles.paragraph}>{question.task}</p>
      <hr></hr>
      <strong style={styles.strong}>Input:</strong>
      <p style={styles.paragraph}>{question.inputFormat}</p>
      <BlackLabel title="exemplo" content={question.inputExample} />

      <strong style={styles.strong}>Output:</strong>
      <p style={styles.paragraph}>{question.outputFormat}</p>
      <BlackLabel title="exemplo" content={question.outputExample} />

      <strong style={styles.strong}>Explicação:</strong>
      <p style={styles.paragraph}>{question.explanation}</p>
    </div>
  );
};

export default QuestionContent;
