import React from "react";
import BlackLabel from "../layout/components/BlackLabel";

const QuestionContent = ({ question }) => {
  return (
    <div>
      <p>
        <span>category: {question.category}</span>
        <br></br>
        level: {question.level}
      </p>
      <h2>{question.title}</h2>

      <p>Objetivo:</p>
      <p>{question.objetive}</p>

      <p>Descrição:</p>
      <p>{question.description}</p>

      <p>Tarefa:</p>
      <p>{question.task}</p>

      <p>Formato input:</p>
      <p>{question.inputFormat}</p>

      <p>Formato output:</p>
      <p>{question.outputFormat}</p>

      <BlackLabel title="Input example" content={question.inputExample} />

      <BlackLabel title="Output example" content={question.outputExample} />

      <p>Explicação:</p>
      <p>{question.explanation}</p>
    </div>
  );
};

export default QuestionContent;
