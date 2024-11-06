import React from "react";

const BlackLabel = ({ title, content }) => {
  const noMessage =
    title === "Input" ? "~ no input provided ~" : "~ no response on stdout ~";

  const isEmptyOrWhitespace = (content) => {
    return !content || content.trim() === "" || content.trim() === "''";
  };

  return (
    <div>
      <strong>{title}:</strong>
      <pre style={styles.pre}>
        {!isEmptyOrWhitespace(content) ? content : noMessage}
      </pre>
    </div>
  );
};

const styles = {
  pre: {
    backgroundColor: "black",
    padding: "10px",
    borderRadius: "3px",
    color: "white",
  },
};

export default BlackLabel;
