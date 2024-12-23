import React, { useState, useEffect } from "react";

const TestResult = ({ testResults }) => {
  return (
    <>
      {testResults.map((test, index) => (
        <li
          key={index}
          style={{
            ...styles.testItem,
            ...(test.passed ? styles.success : styles.fail),
          }}
        >
          <span style={styles.testStatus}>{test.passed ? "✓" : "✕"}</span>
          <p style={styles.testCase}>Test case {index + 1}</p>
        </li>
      ))}
    </>
  );
};

const styles = {
  testItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    margin: "0.5rem 0",
    cursor: "pointer",
    backgroundColor: "#1f202a",
    borderRadius: "5px",
  },
  testStatus: {
    width: "24px",
  },
  testCase: {
    marginLeft: "0.5rem",
  },
};

export default TestResult;
