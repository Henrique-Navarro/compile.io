import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginWrapper = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated, logout } = useLogin();
  const navigate = useNavigate();

  // Verifica o token no localStorage e define o estado de autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  // Função de logout, que limpa o token e redireciona para a página de login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Retorna os filhos clonados com as propriedades necessárias
  return React.cloneElement(children, {
    onLogout: handleLogout,
    isAuthenticated,
  });
};

export default LoginWrapper;
