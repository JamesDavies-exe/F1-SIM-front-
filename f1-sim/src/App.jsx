import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Quiz from "./components/Quiz.jsx";
import Circuit from "./components/Circuit.jsx";
import { AnimatePresence } from "framer-motion";
import "./App.css";
const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);
function App() {
  const [username, setUsername] = useState("");
    const [showNavbar, setShowNavbar] = useState(false);
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
    }
  useEffect(() => {
    if (
      localStorage.getItem("username") != null &&
      localStorage.getItem("token") != null
    ) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      <Router>
      <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"}>F1 Quiz</Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
            <Link to={"/quiz"}>Start</Link>
            </li>
            <li>
            <Link to={"/"}>Tutorial</Link>
            </li>
            <li>
            {username ? (
              <div>
              <Link to={"/setting"}>{username}</Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
            </li>
          </ul>
        </div>
      </div>
    </nav>

        <AnimatePresence>
          <Routes>
            {/* AQUI LAS RUTAS DE LOS COMPONENTES */}
            <Route exact path="/" Component={Home} />
            <Route path="/login" Component={Login}></Route>
            <Route path="/quiz" Component={Quiz}></Route>
            <Route path="/circuit" Component={Circuit}></Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
}

export default App;
