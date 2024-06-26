import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Navbar from "./Navbar";

function EditCircuit() {
    const { circuitId } = useParams();
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCircuitData();
    }, []);

    async function fetchCircuitData() {
        let response = await fetch(`https://www191.cfgs.esliceu.net/getCircuit/${circuitId}`, {
            headers: {
                "Authorization": token
            }
        });
        if (response.ok) {
            let data = await response.json();
            setTitle(data.name);
            setQuestions(data.questions.map(q => ({
                question: q.question,
                options: q.options.split('-'),
                correctOption: q.correctOption
            })));
        } else {
            console.error("Failed to fetch circuit data");
        }
    }

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        if (questions.length < 5) {
            setQuestions([...questions, { question: "", options: ["", "", "", ""], correctOption: "" }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedQuestions = questions.map(q => ({
            question: q.question,
            options: q.options.join('-'),
            correctOption: q.correctOption
        }));
        const payload = {
            name: title,
            questions: formattedQuestions
        };
        let response = await fetch(`https://www191.cfgs.esliceu.net/updateCircuit/${circuitId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            setSnackbarOpen(true);
            navigate('/circuits');
        } else {
            console.error("Failed to update circuit");
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" color={"black"}>Editar Circuito</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}>
                    <TextField
                        label="Título del Circuito"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {questions.map((question, index) => (
                        <Box key={index} mb={2}>
                            <TextField
                                label={`Pregunta ${index + 1}`}
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            {question.options.map((option, optionIndex) => (
                                <TextField
                                    key={optionIndex}
                                    label={`Opción ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            ))}
                            <TextField
                                label="Opción Correcta"
                                value={question.correctOption}
                                onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    ))}
                    {questions.length < 5 && (
                        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                            Añadir Pregunta
                        </Button>
                    )}
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit">
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Circuito actualizado con éxito.
                </Alert>
            </Snackbar>
        </>
    );
}

export default EditCircuit;
