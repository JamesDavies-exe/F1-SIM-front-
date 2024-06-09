import "./style/quiz.css";
import LoginError from "./LoginError";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RankingTable from "./RankingTable";

function Results({ ranking }) {
  return (
    <>
      <section className="quizSection">
        <div className="quizContainer">
        {ranking.map((entry, index) => (
          <li key={index}>
            {index + 1}- {entry.user.name} ({entry.score} points)
          </li>
        ))}
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
  useEffect(() => {
    setFinish(false)
    setToken(localStorage.getItem("token"));
    getQuestions(location.state);
    console.log(questions)
  }, []);
  const handleQuestions = (option) => {
    document.getElementById(option).style.backgroundColor = "white";
    //Mostrar el resultado
    if (option === actualQuestion.correct) {
      console.log("Correct +5 points");
      setPoints(points + 5);
    } else {
      console.log("Incorrect +0 points");
    }
    //Pasar a la siguiente pregunta
    if (actualIndex < questions.length - 1) {
      setActualIndex(actualIndex + 1);
    } else {
      sendScore(points, location.state);
      setFinish(true);
    }
  };

  async function sendScore (score, id){
    let info = {
      score: score,
      circuitId: parseInt(location.state)
    }
    try {
      const response = await fetch("http://localhost:8080/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(info),
      });
      if(response.ok){
        let results = await response.json();
        console.log(results)
        setRanking(results);
      }
    } catch (error) {
      // En caso de error de red u otro error técnico
      console.error("Error al realizar la petición:", error);
    }
  }

  async function getQuestions(id) {
    // Getting all the questions
    let allQuestions = [];
    let response = await fetch("http://localhost:8080/getQuestions/" + id);
    if (response.ok) {
      let json = await response.json();
      console.log(json)
      allQuestions = json;
    } else {
      alert("Error-HTTP: " + response.status);
    }
    // Creating question
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
        <LoginError></LoginError>
      </>
    );
  }
  return (
    <>
      {finish ? (
        <RankingTable ranking={ranking} />
      ) : (
        <section className="quizSection">
          <div className="quizContainer">
            <div className="quizQuestion">{actualQuestion?.question}</div>
          </div>
          {actualQuestion?.options.map((option, key) => (
            <div
              className={"quizOption"}
              id={option}
              key={key}
              onClick={() => handleQuestions(option)}
            >
              {option}
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Quiz;
