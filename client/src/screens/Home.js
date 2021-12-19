import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  let trainerLogged = localStorage.hasOwnProperty("trainerLoggedIn");
  let userLogged = localStorage.hasOwnProperty("userLoggedIn");

  if (userLogged) {
    navigate("/cards");
  }

  const [trainer, setTrainer] = useState();
  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  let trainerID = localStorage.trainerID;

  if (trainerID === undefined) {
    trainerID = "";
  }

  React.useEffect(() => {
    axios.get(trainersURL + trainerID).then((response) => {
      setTrainer(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!trainer) return null;

  if (trainerLogged && trainer.verifiedStatus) {
    navigate("/chat");
  }

  if (trainerLogged && !trainer.verifiedStatus) {
    navigate("/register/wait-for-approval");
  }

  return (
    <div data-testid="home" className="mobile-main">
      <img src="../assets/login_logo.svg" alt="Ezwoof" className="logo"></img>
      <img src="../assets/intro.png" alt="Intro"></img>
      <p className="content">
        לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית נולום ארווס סאפיאן -
        פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
        בנפת נפקט למסון בלרק - וענוף קונדימנטום קורוס בליקרה, נונסטי קלובר
        בריקנה סטום, לפריקך תצטריק לרטי. גולר מונפרר סוברט לורם שבצק יהול, לכנוץ
        בעריר גק ליץ, קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט
        למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו
        צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. נולום ארווס סאפיאן - פוסיליס
        קוויס, אקווזמן לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח
        לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. הועניב היושבב שערש שמחויט - שלושע
        ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש,
        כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.
      </p>
      <Link to="/login">
        <button className="startNow">לחץ כדי להתחיל!</button>
      </Link>
    </div>
  );
}

export default Home;
