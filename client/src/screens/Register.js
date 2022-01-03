import React from "react";
import TrainerRegister from "../components/Users/TrainerRegister";
import UserRegister from "../components/Users/UserRegister";
import "../utils/mobile.css";

function Register() {
  const [loadForm, setForm] = React.useState(0);

  function userActivate() {
    setForm(0);
  }

  function trainerActive() {
    setForm(1);
  }

  return (
    <div data-testid="register" className="mobile-main">
      <img src="../assets/login_logo.svg" alt="Ezwoof" className="logo" />
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
        {loadForm ? <TrainerRegister /> : <UserRegister />}
      </div>
    </div>
  );
}

export default Register;
