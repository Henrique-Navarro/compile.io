import React from "react";
import Span from "./Span";
import Paragraph from "./Paragraph";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
  focused,
}) => {
  const styles = {
    field: {
      marginBottom: "20px",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "bold",
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
    },
    inputFocus: {
      border: "none",
    },
  };

  return (
    <div style={styles.field}>
      <Span text={label} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        required={required}
      />
    </div>
  );
};

export default Input;
