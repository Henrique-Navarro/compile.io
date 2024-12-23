import React from "react";
import useFetchQuestions from "../hooks/useFetchQuestions";
import QuestionItem from "./QuestionItem";
import "./styles.css";

const QuestionsList = () => {
  const { questions, loading, error } = useFetchQuestions();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "1.5rem",
        backgroundColor: "#2d3748",
        color: "#f7fafc",
      }}
    >
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionsList;
