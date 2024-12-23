import { useState, useEffect } from "react";

const useFetchKit = (kitId) => {
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKit = async () => {
      try {
        const response = await fetch(`http://localhost:8080/kits/get/${kitId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setKit(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKit();
  }, [kitId]);

  return { kit, loading, error };
};

export default useFetchKit;
