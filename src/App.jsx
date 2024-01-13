import React from "react";
// import Editor from "./components/Editor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import GlobalSocketProvider from "./context/GlobalSocketProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditorPage from "./pages/EditorPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/docs/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
