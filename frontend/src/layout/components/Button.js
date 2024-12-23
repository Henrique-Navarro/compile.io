import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({ onClick, isLoading, value, backgroundColor }) => {
  const style = {
    backgroundColor: backgroundColor,
    color: "white",
    border: "none",
    padding: "10px 20px",
    width: "100px",
    borderRadius: "4px",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.7 : 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <button onClick={onClick} style={style} disabled={isLoading}>
      {isLoading ? (
        <ClipLoader size={12} color={"#ffffff"} loading={isLoading} />
      ) : (
        value
      )}
    </button>
  );
};

export default Button;
