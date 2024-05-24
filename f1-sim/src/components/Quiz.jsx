import "./style/quiz.css";
import LoginError from "./LoginError";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Results({ points }) {
  return (
    <>
      <section className="quizSection">
        <div className="quizContainer">
          <div className="quizQuestion">You finish with {points} points</div>
        </div>
      </section>
    </>
  );
}

function Quiz() {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);
  const actualQuestion = questions[actualIndex];
  const [points, setPoints] = useState(0);
  const [finish, setFinish] = useState(false);
  const location = useLocation();
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
      console.log("Finish with " + points + " points");
      setPoints(points);
      setFinish(true);
    }
  };

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
        <Results points={points} />
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
