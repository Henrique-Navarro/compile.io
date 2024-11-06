import { useState } from "react";

const useSubmitCode = () => {
  const [correction, setCorrection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitCode = async (codeDTO) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/correction/code/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(codeDTO),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the code");
      }

      const data = await response.json();
      setCorrection(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { correction, setCorrection, loading, error, submitCode };
};

export default useSubmitCode;
