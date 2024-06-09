import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Quiz from "./components/Quiz.jsx";
import Circuit from "./components/Circuit.jsx";
import Register from "./components/Register.jsx";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Results from "./components/Results.jsx";
function App() {
  return (
    <>
      <Router>
        <AnimatePresence>
          <Routes>
            {/* AQUI LAS RUTAS DE LOS COMPONENTES */}
            <Route exact path="/" Component={Home} />
            <Route path="/login" Component={Login}></Route>
            <Route path="/quiz" Component={Quiz}></Route>
            <Route path="/circuit" Component={Circuit}></Route>
            <Route path="/results" Component={Results}></Route>
            <Route path="/register" Component={Register}></Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
}

export default App;
