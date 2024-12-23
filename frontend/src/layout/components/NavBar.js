import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../login/UserContext";
import {
  FaHome,
  FaHistory,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBoxes,
} from "react-icons/fa";

const Navbar = ({ onLogout, isAuthenticated }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const styles = {
    navbar: {
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1f2937",
      color: "white",
    },
    text: {
      color: "white",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginRight: "2rem",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textDecoration: "none",
      color: "#2ccc64",
    },
    linkHover: {
      color: "#4b5563",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      backgroundColor: "#ef4444",
      color: "white",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#dc2626",
    },
    span: {
      color: "#2ccc64",
    },
    themeButton: (isLightTheme) => ({
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      backgroundColor: isLightTheme ? "#e5e7eb" : "#4b5563",
      color: isLightTheme ? "black" : "white",
      marginLeft: "1rem",
    }),
    actions: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      gap: "1rem",
    },
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>
        <span style={styles.span}>C</span>ompile
        <span style={styles.span}>.</span>io
      </h1>
      <div
        style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1 }}
      >
        {isAuthenticated && user ? (
          <>
            <Link
              to="/"
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = styles.linkHover.color)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = styles.link.color)
              }
            >
              <FaHome />
              <span style={styles.text}>Home</span>
            </Link>
            <Link
              to={`/history/${user.id}`}
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = styles.linkHover.color)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = styles.link.color)
              }
            >
              <FaHistory />
              <span style={styles.text}>History</span>
            </Link>
            <Link
              to={`/kits/get-all`}
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = styles.linkHover.color)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = styles.link.color)
              }
            >
              <FaBoxes />
              <span style={styles.text}>Kits</span>
            </Link>
            <Link
              to={`/profile/${user.id}`}
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = styles.linkHover.color)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = styles.link.color)
              }
            >
              <FaUser />
              <span style={styles.text}>Profile</span>
            </Link>
          </>
        ) : null}
      </div>
      <div style={styles.actions}>
        <button
          onClick={toggleTheme}
          style={styles.themeButton(theme === "light")}
        >
          {theme === "light" ? (
            <FaMoon style={{ marginRight: "0.5rem" }} />
          ) : (
            <FaSun style={{ marginRight: "0.5rem" }} />
          )}
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.button.backgroundColor)
            }
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
