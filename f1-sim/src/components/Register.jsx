import "./style/login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://f1quiz.es/">
        Formula One Quiz
              </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Register() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  let navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const data = { mail: mail, password: password };
    console.log(data);
    postLogin(data);
  };

  async function sendRegister(user) {
    console.log(user);
    return await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) navigate("/login")
        if (response.status === 409) return "Error";
      })
      .catch(() => {
        return "Error creating user";
      });
  }
  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/logingoogle");
      const url = await response.text();
      window.location.href = url;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user ={
      mail: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
    };
    sendRegister(user);
  };
  return (
    <>
     <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: "#00352F",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crea una cuenta
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
              />
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, BackgrounColor: "#CEDC00" }}
              >
                Registrarse
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"¿Ya tienes cuenta? Inicia sesión"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}

export default Register;
