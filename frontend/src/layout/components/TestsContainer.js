import React, { useState, useEffect } from "react";
import BlackLabel from "./BlackLabel";
import TestResult from "./TestResult";

const TestsContainer = ({ resultData }) => {
  const [selectedTest, setSelectedTest] = useState(null);

  // Efeito para definir o primeiro teste como selecionado
  useEffect(() => {
    if (resultData && resultData.testResults.length > 0) {
      setSelectedTest(resultData.testResults[0]); // Seleciona o primeiro teste
    }
  }, [resultData]); // O efeito roda sempre que resultData muda

  if (!resultData) return null;
  //console.log(resultData);

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  const formatOutput = (output) => {
    if (!output.replace("\n", "")) return ["~ no input provided ~"];
    return output.trim().split("\n");
  };

  return (
    <>
      <h1
        style={{
          ...styles.resultTitle,
          color: resultData.hasErrors ? "#ff516b" : "#20d761",
        }}
      >
        {resultData.hasErrors
          ? `${resultData.testsFailed}/${resultData.testResults.length} test cases failed :(`
          : `${resultData.testsPassed}/${resultData.testResults.length} test cases passed :D`}
      </h1>

      <div style={styles.container}>
        <div style={styles.testContainer}>
          <div style={styles.testList}>
            <ul style={styles.testItems}>
              <TestResult testResults={resultData.testResults} />
            </ul>
          </div>

          <div style={styles.detailsContainer}>
            {selectedTest ? (
              <>
                <BlackLabel
                  title="Input"
                  content={selectedTest.testCase.input}
                />
                <BlackLabel title="Output" content={selectedTest.output} />
                <BlackLabel
                  title="Expected Output"
                  content={selectedTest.testCase.expectedOutput}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    backgroundColor: "#282c34",
    display: "flex",
    padding: "20px",
    color: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  resultTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  testContainer: {
    display: "flex",
    width: "100%",
  },
  testList: {
    width: "200px",
    padding: 0,
    marginRight: "20px",
  },
  testItems: {
    listStyleType: "none",
    padding: 0,
  },

  success: {
    color: "#20d761",
  },
  fail: {
    color: "#ff516b",
  },
  selected: {
    backgroundColor: "#4a4e69",
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: "#1f202a",
    padding: "1rem",
    borderRadius: "5px",
    overflow: "hidden",
  },
};

export default TestsContainer;
