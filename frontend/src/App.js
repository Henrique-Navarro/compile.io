import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import QuestionList from "./questionList/QuestionList";
import Question from "./question/Question";
import NavBar from "./layout/components/NavBar";
import { ThemeProvider } from "./layout/theme/ThemeProvider";
import SubmitHistoryPage from "./submitHistory/SubmitHistory";
import ProtectedRoute from "./login/ProtectedRoute";
import LoginForm from "./login/LoginForm";
import ProfilePage from "./profile/ProfilePage";
import useLogin from "./hooks/useLogin";
import { UserProvider } from "./login/UserContext";
import KitsList from "./kits/KitsList";
import Kit from "./kits/Kit";
import SignUpForm from "./login/SignUpForm";

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

const AppContent = () => {
  const { login, logout, isAuthenticated } = useLogin();
  const location = useLocation();
  const hideNavBar = location.pathname === "/login";

  return (
    <>
      {!hideNavBar && (
        <NavBar onLogout={logout} isAuthenticated={isAuthenticated} />
      )}
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={login} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <QuestionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/get-all"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <QuestionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/get/:questionId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:userId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SubmitHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kits/get-all"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <KitsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kits/get/:kitId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Kit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
