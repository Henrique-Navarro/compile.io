import React from "react";
import Span from "./Span.js";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
}) => {
  const styles = {
    field: {
      marginBottom: "20px",
      color: "#ffffff",
      fontSize: "14px",
    },
    input: {
      width: "95%",
      padding: "12px",
      marginTop: "8px",
      border: "1px solid #444",
      borderRadius: "5px",
      backgroundColor: "#2b2f3a",
      color: "#ffffff",
      fontSize: "14px",
      resize: "none",
      transition: "border-color 0.3s ease",
      resize: "none",
    },
    inputFocus: {
      border: "none",
    },
  };

  return (
    <div style={styles.field}>
      <Span text={label} />
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
      />
    </div>
  );
};

export default Textarea;
