import React from "react";
import BlackLabel from "../layout/components/BlackLabel";
import LevelIndicator from "../layout/components/LevelIndicator";
import Title from "../layout/components/Title";
import Paragraph from "../layout/components/Paragraph";

const QuestionContent = ({ question }) => {
  const styles = {
    content: {
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
      fontWeight: "100",
    },
    categoryAndLevel: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    strong: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.content}>
      <LevelIndicator level={question.level} category={question.category} />

      <Title text={question.title} />

      <strong style={styles.strong}>Descrição:</strong>
      <Paragraph text={question.description} />

      <strong style={styles.strong}>Tarefa:</strong>
      <Paragraph text={question.task} />

      <hr></hr>
      <strong style={styles.strong}>Input:</strong>
      <Paragraph text={question.inputFormat} />

      <BlackLabel
        title="exemplo"
        content={question.inputExample}
        type="input"
      />

      <strong style={styles.strong}>Output:</strong>
      <Paragraph text={question.outputFormat} />

      <BlackLabel
        title="exemplo"
        content={question.outputExample}
        type="output"
      />
    </div>
  );
};

export default QuestionContent;
