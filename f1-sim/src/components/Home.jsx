import "./style/home.css";
import "./fonts/Formula1-Bold_web.ttf";
function Home() {
  return (
    <>
      <section className="home">
        <div className="homeDiv">
          <div className="homeTitle">F1 QUIZ</div>
          <div className="homeDesc">
            Sumergete en el mundo de la Formula 1 compitiendo por resolver más preguntas que nadie alrededor de 21 circuitos 
          </div>
          <div className="btnDiv">
            <button className="button">Play</button>
          </div>
        </div>

        <div className="pictureDiv">
          <img src="/background.jpg" alt="" />
        </div>
      </section>
    </>
  );
}

export default Home;
