import "./style/login.css";
import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import GoogleButton from "react-google-button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://f1quiz.es/">
        Formula One Quiz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Login() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, []);
  const login = async (event) => {
    event.preventDefault();
    const data = { email: mail, password: password };
    console.log(data);
    postLogin(data);
  };

  async function postLogin(data) {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const info = await response.json();
        localStorage.setItem("token", info.token);
        localStorage.setItem("username", info.username);
        navigate("/");
      } else {
        // Manejar los códigos de respuesta cuando no es exitoso
        if (response.status === 409) {
          setMsg("User or password incorrect");
        } else {
          setMsg("Unknown error, try again later");
        }
        setShowAlert(true);
      }
    } catch (error) {
      // En caso de error de red u otro error técnico
      console.error("Error al realizar la petición:", error);
      setMsg("Server error");
    }
  }

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
    let user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    postLogin(user);
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {showAlert && <Alert severity="error">{msg}</Alert>}
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: "#00352F",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Inicia sesión
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar Sesión
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to={"/register"}>
                      ¿No tienes cuenta? Crea una
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
export default Login;
