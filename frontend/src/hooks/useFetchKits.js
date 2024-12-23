import { useState, useEffect } from "react";

const useFetchKits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await fetch("http://localhost:8080/kits/get-all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setKits(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  return { kits, loading, error };
};

export default useFetchKits;
