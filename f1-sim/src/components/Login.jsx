import "./style/login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  let navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const data = { email: mail, password: password };
    console.log(data);
    postLogin(data);
  };

  async function postLogin(data) {
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
      }
    } catch (error) {
      // En caso de error de red u otro error técnico
      console.error("Error al realizar la petición:", error);
      setMsg("Server error");
    }
  }
  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleGoogleLogin = async () => {
    try{
      const response = await fetch("http://localhost:8080/logingoogle");
      const url = await response.text();
      window.location.href = url
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return (
    <>
      <div className="loginContainer">
        <div className="login">
          <h2
            className={isLoginActive ? "active" : "nonactive"}
            onClick={toggleForm}
          >
            Log in
          </h2>
          <h2
            className={!isLoginActive ? "active" : "nonactive"}
            onClick={toggleForm}
          >
            Sign Up
          </h2>

          {isLoginActive ? (
            <>
              <input
                type="email"
                className="text"
                name="username"
                onChange={(event) => setMail(event.target.value)}
              />
              <span>mail</span>

              <input
                type="password"
                className="text"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span>password</span>

              <button className="signin" onClick={login}>
                Log in
              </button>
              <a className="message" color="red">
                {msg}
              </a>

              <button type="button" class="login-with-google-btn" onClick={handleGoogleLogin}>
                Sign in with Google
              </button>
            </>
          ) : (
            <Signup />
          )}
        </div>
      </div>
    </>
  );
}

function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const signup = async (event) => {
    event.preventDefault();
    let user = {
      name: name,
      mail: mail,
      password: password,
    };
    setMsg(String(await post(user)));
  };

  async function post(user) {
    return await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return "User " + user.name + " created, now log in";
        if (response.status === 409) return "Error";
      })
      .catch(() => {
        return "Error creating user";
      });
  }
  return (
    <>
      <input
        type="email"
        className="text"
        name="username"
        onChange={(event) => setMail(event.target.value)}
      />
      <span>mail</span>

      <input
        type="text"
        className="text"
        name="username"
        onChange={(event) => setName(event.target.value)}
      />
      <span>name</span>

      <input
        type="password"
        minLength={6}
        className="text"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <span>password</span>

      <button className="signin" onClick={signup}>
        Sign Up
      </button>

      <a className="message">{msg}</a>
    </>
  );
}
export default Login;
