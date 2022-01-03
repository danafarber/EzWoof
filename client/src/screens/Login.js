import React from "react";
import UserLogin from "../components/Users/UserLogin";
import TrainerLogin from "../components/Users/TrainerLogin";
import "../utils/mobile.css";

function Login() {
  const [loadForm, setForm] = React.useState(0);

  function userActivate() {
    setForm(0);
  }

  function trainerActive() {
    setForm(1);
  }

  return (
    <div data-testid="login" className="mobile-main">
      <img src="../assets/login_logo.svg" alt="Ezwoof" className="logo"></img>
      <div className="tabs">
        <button
          id="user"
          className={!loadForm ? "active" : null}
          onClick={userActivate}
        >
          בעל כלב
        </button>
        <button
          id="trainer"
          onClick={trainerActive}
          className={loadForm ? "active" : null}
        >
          מאלף
        </button>
      </div>
      <div className="login_form">
        {loadForm ? <TrainerLogin /> : <UserLogin />}
      </div>
    </div>
  );
}

export default Login;
