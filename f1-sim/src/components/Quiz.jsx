import "./style/quiz.css";
import LoginError from "./LoginError";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, List, ListItem } from '@mui/material';
import RankingTable from "./RankingTable";

function Results({ ranking }) {
  return (
    <>
      <section className="quizSection">
        <div className="quizContainer">
          <List>
            {ranking.map((entry, index) => (
              <ListItem key={index}>
                {index + 1}- {entry.user.name} ({entry.score} points)
              </ListItem>
            ))}
          </List>
        </div>
      </section>
    </>
  );
}

function Quiz() {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);
  const actualQuestion = questions[actualIndex];
  const [points, setPoints] = useState(0);
  const [finish, setFinish] = useState(false);
  const location = useLocation();
  const circuitId = location.state;
  const navigate = useNavigate();
  const [optionColors, setOptionColors] = useState({}); // Estado para los colores de las opciones

  useEffect(() => {
    setFinish(false);
    setToken(localStorage.getItem("token"));
    getQuestions(circuitId);
    console.log(questions);
  }, []);

  const handleQuestions = (option) => {
    const newOptionColors = {};
    if (option === actualQuestion.correct) {
      newOptionColors[option] = "green";
      setPoints(points + 5);
    } else {
      newOptionColors[option] = "red";
    }
    setOptionColors(newOptionColors);

    setTimeout(() => {
      if (actualIndex < questions.length - 1) {
        setActualIndex(actualIndex + 1);
        setOptionColors({});
      } else {
        sendScore(points, location.state);
        setFinish(true);
      }
    }, 1000); // Espera 1 segundo antes de pasar a la siguiente pregunta
  };

  async function sendScore(score, id) {
    let info = {
      score: score,
      circuitId: parseInt(location.state)
    }
    try {
      const response = await fetch("https://www191.cfgs.esliceu.net/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(info),
      });
      if (response.ok) {
        let results = await response.json();
        console.log(results);
        setRanking(results);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  }

  async function getQuestions(id) {
    let allQuestions = [];
    let response = await fetch("https://www191.cfgs.esliceu.net/getQuestions/" + id);
    if (response.ok) {
      let json = await response.json();
      console.log(json);
      allQuestions = json;
    } else {
      alert("Error-HTTP: " + response.status);
    }
    let questionAr = [];
    allQuestions.forEach(question => {
      let questionObj = {
        question: question.question,
        options: question.options.split("-"),
        correct: question.correctOption
      }
      questionAr.push(questionObj);
    });
    setQuestions(questionAr);
  }

  if (token == null) {
    return (
      <>
        <LoginError />
      </>
    );
  }

  return (
    <>
      {finish ? (
        <RankingTable ranking={ranking} />
      ) : (
        <Box className="quizSection" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card className="quizContainer" sx={{ width: '80%', marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" className="quizQuestion">{actualQuestion?.question}</Typography>
            </CardContent>
          </Card>
          {actualQuestion?.options.map((option, key) => (
            <Button
              variant="contained"
              className="quizOption"
              id={option}
              key={key}
              onClick={() => handleQuestions(option)}
              sx={{
                marginBottom: 1,
                width: '80%',
                backgroundColor: optionColors[option] || 'blue',
                color: 'white',
                '&:hover': {
                  backgroundColor: optionColors[option] || 'blue',
                }
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      )}
    </>
  );
}

export default Quiz;
