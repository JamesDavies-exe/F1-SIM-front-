import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import Navbar from './Navbar';

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState("")
  const [errorType, setErrorType] = useState("");
  const[openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handlePasswordChange = async (e) => {
    setMsg("");
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6){
        alert("La contraseña no puede contener menos de 6 caracteres");
        return;
    }

    let response = await fetch("https://www191.cfgs.esliceu.net/changePassword", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword
      })
    });
    let mensaje = (await response.text());
    setMsg(mensaje);
    console.log(msg);
    setOpenSnackbar(true);
    if(msg.startsWith("Error")){
        setErrorType("error")
    }else {
        setErrorType("success")
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Typography variant="h4" color={"black"}>{username}</Typography>
      <form onSubmit={handlePasswordChange}>
        <TextField
          label="Contraseña Actual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirmar Nueva Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Cambiar Contraseña
        </Button>
      </form>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px', backgroundColor: 'red' }}
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={errorType} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Settings;
