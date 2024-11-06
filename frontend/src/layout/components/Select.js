import React from "react";

const Select = ({ language, handleLanguageChange }) => {
  const style = {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <select value={language} onChange={handleLanguageChange} style={style}>
      <option value="php">Php</option>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </select>
  );
};

export default Select;
