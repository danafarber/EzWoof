import React, { useState } from "react";
import axios from "axios";
import CardsSwipe from "../components/Cards/CardsSwipe";
import NavBar from "../components/Cards/NavBar";
import {useNavigate} from 'react-router-dom'

function Cards() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState();

  let loggedUserID = localStorage.userID;

  function checkLoginStatus() {
    const lsValidate = localStorage.hasOwnProperty("userLoggedIn");

    if (lsValidate) {
      console.log("User Logged Sucssefully");
    } else {
      navigate("/login")
    }
  }
  checkLoginStatus();

  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";

  React.useEffect(() => {
    axios.get(trainersURL).then((response) => {
      setTrainers(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!trainers) return null;

  let verifiedTrainers = [];

  function popVerifiedTrainers() {
    for (let i = 0; i < trainers.length; i++) {
      if (trainers[i].verifiedStatus === true) {
        verifiedTrainers.push(trainers[i]);
      }
    }
  }

  popVerifiedTrainers();

  return (
    <div className="cards-main">
      <img className="colored-logo" src="assets/colored_logo.svg" alt="Logo" />

      <CardsSwipe
        verifiedTrainers={verifiedTrainers}
        loggedUserID={loggedUserID}
      />

      <NavBar />
    </div>
  );
}

export default Cards;
