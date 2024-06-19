import "./style/home.css";
import "./fonts/Formula1-Bold_web.ttf";
import Navbar from "./Navbar"
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";
function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div className="video-background">
        <video autoPlay loop muted>
          <source src="/film.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section class="showcase">
    <div class="overlay"></div>
    <div class="text">
      <h3>Formula One Quiz</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.</p>
      <Link to={"/login"}>Empezar</Link>
    </div>
  </section>
    </>
  );
}

export default Home;
