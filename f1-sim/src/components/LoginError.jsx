import { useNavigate } from "react-router-dom"
import { Box, Typography, Button } from '@mui/material';
function LoginError(){
  const navigate = useNavigate();
  let handleLogin = () => {
    navigate("/login");
  }
    return(
        <>
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
        ERROR
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Parece que no has iniciado sesión
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate("/login")}>
        Iniciar Sesión
      </Button>
    </Box>
        </>
    )
}

export default LoginError