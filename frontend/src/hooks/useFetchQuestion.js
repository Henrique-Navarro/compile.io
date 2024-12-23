import { useState, useEffect } from "react";

const useFetchQuestion = (questionId) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/questions/get/${questionId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  return { question, loading, error };
};

export default useFetchQuestion;
