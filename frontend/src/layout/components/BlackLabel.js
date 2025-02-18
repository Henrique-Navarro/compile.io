import React from "react";

const BlackLabel = ({ title, content, type }) => {
  const noMessage =
    type === "input" ? "~ no input provided ~" : "~ no response on stdout ~";

  const isEmptyOrWhitespace = (content) => {
    return !content || content.trim() === "" || content.trim() === "''";
  };

  return (
    <div>
      <strong style={styles.strong}>{title}:</strong>
      <pre style={styles.pre}>
        {!isEmptyOrWhitespace(content) ? content : noMessage}
      </pre>
    </div>
  );
};

const styles = {
  pre: {
    backgroundColor: "black",
    padding: "17px",
    borderRadius: "3px",
    color: "white",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  strong: {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: "500",
    fontSize: "14px",
  },
};

export default BlackLabel;
