import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCubes,
  FaFont,
  FaCalculator,
  FaListUl,
  FaSyncAlt,
  FaPlusCircle,
  FaQuestionCircle,
  FaExchangeAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import useFetchKit from "../hooks/useFetchKit";
import LevelIndicator from "../layout/components/LevelIndicator";
import QuestionItem from "../questionList/QuestionItem";
import useUserProfile from "../hooks/useUserProfile";
import ProgressBar from "../layout/components/ProgressBar";
import Back from "../layout/components/Back";

const categoryIcons = {
  POO: FaCubes,
  STRING: FaFont,
  MATH: FaCalculator,
  ARRAY: FaListUl,
  LOOPS: FaSyncAlt,
  OPERATIONS: FaPlusCircle,
  CONDITIONS: FaQuestionCircle,
  CONVERSIONS: FaExchangeAlt,
  NUMBERS: FaSortNumericDown,
};

const Kit = () => {
  const { kitId } = useParams();
  const { kit, loading: kitLoading, error: kitError } = useFetchKit(kitId);
  const [questions, setQuestions] = useState([]);
  const { profile, isLoading, errorMessage } = useUserProfile(1);

  useEffect(() => {
    if (kit?.questions) {
      const fetchAllQuestions = async () => {
        try {
          const fetchedQuestions = await Promise.all(
            kit.questions.map(async (id) => {
              const response = await fetch(
                `http://localhost:8080/questions/get/${id}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch question");
              }
              const data = await response.json();
              return data;
            })
          );
          setQuestions(fetchedQuestions);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      fetchAllQuestions();
    }
  }, [kit?.questions]);

  if (kitLoading) {
    return <></>;
  }

  if (kitError) {
    return <div>Error: {kitError}</div>;
  }

  const Icon = categoryIcons[kit.category] || FaCubes;

  const questionsSolved = profile?.questionsSolved || [];
  const totalQuestions = kit.questions.length;
  const completedQuestions = kit.questions.filter((question) =>
    questionsSolved.includes(question)
  ).length;

  const styles = {
    mainContainer: {
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: "#2a2e38",
      color: "#f7fafc",
      borderRadius: "0 0 0.75rem 0.75rem",
      position: "relative",
    },
    kitHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    kitIcon: {
      fontSize: "2rem",
      color: "white",
    },
    kitTitle: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#e2e8f0",
    },
    questionListContainer: {
      marginTop: "1rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0.5rem 1rem",
    },
    questionLink: {
      textDecoration: "none",
      color: "#e2e8f0",
      fontWeight: "bold",
      display: "block",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <Back route={"/kits/get-all"} />
      <div style={styles.kitHeader}>
        <Icon style={styles.kitIcon} />
        <div>
          <h1 style={styles.kitTitle}>{kit.name}</h1>
          <LevelIndicator level={kit.level} category={kit.category} />
        </div>
      </div>
      <p>Descrição do kit {kit.description}</p>
      <ProgressBar
        max={totalQuestions}
        current={completedQuestions}
        height={10}
      />
      <div style={styles.questionListContainer}>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Kit;
