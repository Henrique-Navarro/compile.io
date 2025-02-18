import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, errorMessage } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <div style={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.box}>
          <button
            type="button"
            style={{
              ...styles.button,
              backgroundColor: "#28a745",
              border: "none",
            }}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  box: {
    display: "flex",
    padding: "",
    gap: "20px",
  },
  header: {
    color: "#ffffff",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#18141c",
    padding: "20px",
  },
  form: {
    backgroundColor: "#20242c",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
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
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  message: {
    color: "#28a745",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginForm;
