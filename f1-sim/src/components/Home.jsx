import "./style/home.css";
import "./fonts/Formula1-Bold_web.ttf";
import Navbar from "./Navbar"
import { Box, Typography, Button } from '@mui/material';
function Home() {
  return (
    <>
    <Navbar></Navbar>
        <Box
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        FORMULA ONE QUIZ
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Descubre tu conocimiento sobre la Formula 1 y compite para llegar a lo más alto
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Jugar
      </Button>
    </Box>
    </>
  );
}

export default Home;
