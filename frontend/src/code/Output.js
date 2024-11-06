import React from "react";
import BlackLabel from "../layout/components/BlackLabel";

const Output = ({ output, inputExample }) => {
  if (!output) return null;

  const formatOutput = (output) => {
    if (!output.replace("\n", "")) return ["~ no response on stdout ~"];
    return output.trim().split("\n");
  };

  const outputLines = formatOutput(output.output);

  return (
    <div style={styles.outputContainer}>
      <div style={styles.inputSection}>
        <BlackLabel title="Input" content={inputExample} />
      </div>

      <div style={styles.outputSection}>
        <h4 style={styles.sectionTitle}>Output</h4>
        <div style={styles.outputBox}>
          {outputLines.map((line, index) => (
            <div key={index} style={styles.outputLine}>
              <span style={styles.lineNumber}>{index + 1}</span>
              <span style={styles.lineSeparator} />
              <span style={styles.lineContent}>{line}</span>
            </div>
          ))}
          <p style={styles.exitCode}>
            <strong>Exit Code:</strong> {output.exitCode}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  outputContainer: {
    borderRadius: "5px",
    margin: "20px 0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#1f202a",
  },
  sectionTitle: {
    margin: "0 0 5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
  },
  inputSection: {
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#1f202a",
    border: "1px solid #ddd",
    marginBottom: "15px",
  },
  outputSection: {
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#1f202a",
    border: "1px solid #ddd",
    color: "black",
  },
  inputExample: {
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    color: "white",
  },
  outputBox: {
    maxHeight: "200px",
    overflowY: "auto",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "monospace",
    backgroundColor: "black",
    color: "white",
  },
  outputLine: {
    lineHeight: "1.5",
    padding: "3px 0",
    display: "flex",
    alignItems: "center",
  },
  lineNumber: {
    width: "10px",
    color: "#333",
  },
  lineSeparator: {
    width: "1px",
    height: "20px",
    backgroundColor: "lightgray",
    margin: "0 10px",
  },
  exitCode: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default Output;
