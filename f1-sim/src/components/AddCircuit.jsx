import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import Navbar from "./Navbar";

function AddCircuit() {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, [field]: value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedOptions = question.options.map((option, oIndex) =>
                    oIndex === optionIndex ? value : option
                );
                return { ...question, options: updatedOptions };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        if (questions.length < 5) {
            setQuestions([
                ...questions,
                { question: "", options: Array(4).fill(""), correctOption: "" }
            ]);
        }
    };

    async function saveNewCircuit() {
        const formattedQuestions = questions.map(q => ({
            ...q,
            options: q.options.join('-')
        }));

        let response = await fetch(`https://www191.cfgs.esliceu.net/addCircuit`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                title,
                questions: formattedQuestions
            })
        });

        if (response.ok) {
            setSnackbarMessage("Circuito creado con éxito..");
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage("Error al crear el circuito.");
            setSnackbarOpen(true);
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Navbar />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" color={"black"}>Añadir Circuito</Typography>
            </Box>
            <Card style={{ margin: '10px' }}>
                <CardContent>
                    <TextField
                        label="Título del Circuito"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    {questions.map((question, qIndex) => (
                        <Box key={qIndex} mt={2}>
                            <TextField
                                label="Pregunta"
                                value={question.question}
                                fullWidth
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            />
                            {question.options.map((option, oIndex) => (
                                <TextField
                                    key={oIndex}
                                    label={`Opción ${oIndex + 1}`}
                                    value={option}
                                    fullWidth
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    style={{ marginTop: '8px' }}
                                />
                            ))}
                            <TextField
                                label="Opción Correcta"
                                value={question.correctOption}
                                fullWidth
                                onChange={(e) => handleQuestionChange(qIndex, 'correctOption', e.target.value)}
                                style={{ marginTop: '8px' }}
                            />
                        </Box>
                    ))}
                    {questions.length < 5 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addQuestion}
                            style={{ marginTop: '20px' }}
                        >
                            Añadir Pregunta
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveNewCircuit}
                        style={{ marginTop: '20px', marginLeft: '10px' }}
                    >
                        Guardar
                    </Button>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddCircuit;
