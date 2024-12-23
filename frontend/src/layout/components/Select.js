import React from "react";

const Select = ({ language, handleLanguageChange }) => {
  const style = {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#333",
    color: "white",
    fontSize: "0.875rem",
    width: "300px",
    display: "inline-block",
  };

  const optionStyle = {
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    fontWeight: "100",
    fontSize: "0.775rem",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <select value={language} onChange={handleLanguageChange} style={style}>
        <option value="php" style={optionStyle}>
          PHP
        </option>
        <option value="javascript" style={optionStyle}>
          JavaScript
        </option>
        <option value="python" style={optionStyle}>
          Python
        </option>
      </select>
    </div>
  );
};

export default Select;
