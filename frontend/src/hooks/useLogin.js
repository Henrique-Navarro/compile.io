import { useState, useEffect } from "react";
import { useUser } from "../login/UserContext";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, [user, setUser]);

  const login = async (email, password) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);

      const userData = { id: data.id, token: data.token };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong!");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    errorMessage,
  };
};

export default useLogin;
