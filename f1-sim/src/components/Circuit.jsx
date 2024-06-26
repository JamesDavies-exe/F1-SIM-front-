import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginError from "./LoginError";
import { Card, CardContent, Typography, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import Navbar from "./Navbar";
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const TitleTypography = styled(Typography)({
    marginBottom: '20px',
    fontWeight: 'bold',
});

const CircuitContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

function Circuit() {
    const [circuits, setCircuits] = useState([]);
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({});
    const [editingCircuitId, setEditingCircuitId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [circuitToDelete, setCircuitToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        getUser();
        getCircuits();
    }, []);

    async function getUser() {
        let response = await fetch("https://www191.cfgs.esliceu.net/getUser", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        let json = await response.json();
        setUser(json);
    }

    async function getCircuits() {
        let response = await fetch("https://www191.cfgs.esliceu.net/getCircuits", {
            headers: {
                "Authorization": token
            }
        });
        if (response.ok) {
            let json = await response.json();
            setCircuits(json);
        } else {
            console.log("Error, user not found");
        }
    }

    async function saveCircuitTitle(circuitId) {
        let response = await fetch(`https://www191.cfgs.esliceu.net/updateCircuit/${circuitId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ title: editedTitle }) // updated to send JSON
        });
        if (response.ok) {
            setEditingCircuitId(null);
            getCircuits();
        } else {
            console.error("Failed to update circuit");
        }
    }

    async function deleteCircuit() {
        let response = await fetch(`https://www191.cfgs.esliceu.net/deleteCircuit/${circuitToDelete}`, {
            method: 'DELETE',
            headers: {
                "Authorization": token
            }
        });
        if (response.ok) {
            setDeleteDialogOpen(false);
            setSnackbarOpen(true);
            getCircuits();
        } else {
            console.error("Failed to delete circuit");
        }
    }

    const handleDeleteClick = (circuitId) => {
        setCircuitToDelete(circuitId);
        setDeleteDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const navigateToAddCircuit = () => {
        navigate('/add');
    };

    const navigateToEditCircuit = (circuitId) => {
        navigate(`/edit/${circuitId}`);
    };

    if (token == null) {
        return (
            <>
                <LoginError />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <TitleTypography variant="h4" color={"black"}>Circuits</TitleTypography>
                {user.role === "admin" && (
                    <Button variant="contained" color="primary" onClick={navigateToAddCircuit}>
                        Añadir Circuito
                    </Button>
                )}
            </Box>
            <CircuitContainer>
                {circuits.map(circuit => (
                    <StyledCard key={circuit.id}>
                        <CardContent>
                            {editingCircuitId === circuit.id ? (
                                <>
                                    <TextField
                                        label="Título del Circuito"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Box mt={2} display="flex" justifyContent="space-between">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => saveCircuitTitle(circuit.id)}
                                        >
                                            Guardar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => setEditingCircuitId(null)}
                                        >
                                            Cancelar
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6">Ronda: {circuit.id}</Typography>
                                    <Typography variant="subtitle1">GP {circuit.name}</Typography>
                                    {user.role === "admin" ? (
                                        <Box mt={2} display="flex" justifyContent="space-between">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigateToEditCircuit(circuit.id)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteClick(circuit.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    ) : (
                                        circuit.done ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate('/results', { state: { circuitId: circuit.id } })}
                                            >
                                                Ver Resultados
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => navigate('/quiz', { state: circuit.id })}
                                            >
                                                Jugar
                                            </Button>
                                        )
                                    )}
                                </>
                            )}
                        </CardContent>
                    </StyledCard>
                ))}
            </CircuitContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este circuito y todas sus preguntas?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={deleteCircuit} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Circuito eliminado con éxito.
                </Alert>
            </Snackbar>
        </>
    );
}

export default Circuit;
