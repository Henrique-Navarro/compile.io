import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const { user } = useUser();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
