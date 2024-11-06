import { useState } from "react";

const useRunCode = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runCode = async (codeDTO) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/correction/code/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(codeDTO),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to run the code");
      }

      const data = await response.json();
      setOutput(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { output, setOutput, loading, error, runCode };
};

export default useRunCode;
