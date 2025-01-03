import React, { useState, useEffect } from "react";
import useFetchQuestions from "../hooks/useFetchQuestions";
import useUserProfile from "../hooks/useUserProfile";
import QuestionItem from "./QuestionItem";
import "./styles.css";
import { Container } from "react-bootstrap";
import Filter from "./Filter";
import { applyFilter } from "./filterUtils";

const QuestionsList = () => {
  const userId = 1; // ID fixo do usuário
  const { questions, loading, error } = useFetchQuestions();
  const {
    profile,
    isLoading: profileLoading,
    errorMessage,
  } = useUserProfile(userId);

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!loading && !profileLoading && questions.length > 0) {
      const filtered = applyFilter(questions, filters, profile);
      setFilteredQuestions(filtered);
    }
  }, [filters, questions, profile]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (error || errorMessage) {
    return <div>Error loading data</div>;
  }

  const container = {
    maxWidth: "1500px",
    margin: "0 auto",
    padding: "1.5rem",
    color: "#f7fafc",
    display: "flex",
    gap: "1.5rem",
  };

  const leftBox = {
    flex: "1",
  };

  return (
    <Container style={container}>
      <div style={leftBox}>
        {filteredQuestions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <Filter onFilterChange={handleFilterChange} />
    </Container>
  );
};

export default QuestionsList;
