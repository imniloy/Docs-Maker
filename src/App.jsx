import React from "react";
// import Editor from "./components/Editor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalSocketProvider from "./context/GlobalSocketProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditorPage from "./pages/EditorPage";
import { ConfigProvider } from "react-avatar";
import SessionsPage from "./pages/SessionsPage";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/routeProtector/PrivateRoute";
import PublicRoute from "./components/routeProtector/PublicRoute";

const App = () => {
  return (
    <ConfigProvider colors={["#AB47BC", "#C2185B", "EF6C00", "green", "blue"]}>
      <GlobalSocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/docs/:id"
                element={
                  <PrivateRoute>
                    <EditorPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/myaccount/:id"
                element={
                  <PrivateRoute>
                    <SessionsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </GlobalSocketProvider>
    </ConfigProvider>
  );
};

export default App;
