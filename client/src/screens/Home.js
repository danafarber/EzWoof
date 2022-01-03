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
      <Link to="/login">
        <button className="startNow">לחץ כדי להתחיל!</button>
      </Link>
    </div>
  );
}

export default Home;
