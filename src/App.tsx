import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/signupPage/SignupPage";
import LogingPage from "./pages/loginPage/LoginPage";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import Exercises from "./pages/Teacher/exercises/Exercises";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LogingPage />} />
            <Route path="/teacher/exercises" element={<Exercises />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
