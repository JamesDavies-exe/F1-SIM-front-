import { useNavigate } from "react-router-dom"
function LoginError(){
  let handleLogin = () => {
    useNavigate("/login");
  }
    return(
        <>
        <section className="home">
        {/* <video className="videoTag" autoPlay loop muted>
          <source src="film.mp4" type="video/mp4" />
        </video> */}
        <div class="homeDiv">
          <div className="homeTitle">Please login</div>
          <div className="homeDesc">
            You need an account to start to play the Formula One quiz
          </div>
          <div className="btnDiv">
            <button class="button" onClick={handleLogin()}>Login</button>
          </div>
        </div>

        <div className="pictureDiv">
          <img className="error" src="/background.jpg" alt="" />
        </div>
      </section>
        </>
    )
}

export default LoginError