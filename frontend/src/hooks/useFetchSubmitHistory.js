import { useState, useEffect } from "react";

const useFetchSubmitHistory = (userId) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/history/getAllByUserId/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  return { history, loading, error };
};

export default useFetchSubmitHistory;
