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
      <p>Compite con otros usuarios en cuestionarios sobre Formula 1 alrededor de los 24 circuitos de todo el mundo</p>
      <Link to={"/login"}>Empezar</Link>
    </div>
  </section>
    </>
  );
}

export default Home;
