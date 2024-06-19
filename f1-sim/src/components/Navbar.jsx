import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
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
          fill="white"
        />
        <rect
          id="Rectangle_5"
          data-name="Rectangle 5"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 67)"
          fill="white"
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="52"
          height="4"
          rx="2"
          transform="translate(294 57)"
          fill="white"
        />
      </g>
    </svg>
  );
function Navbar(){
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
    return(
        <>
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
            <Link to={"/circuit"}>Start</Link>
            </li>
            <li>
            {username ? (
              <div>
              <Link to={"/settings"}>{username}</Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar;