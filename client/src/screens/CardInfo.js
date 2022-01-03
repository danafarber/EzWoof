import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CardTop from "../components/Cards/CardTop";

function CardInfo() {
  const [trainer, setTrainer] = useState();

  const search = useLocation().search;
  let cardID = new URLSearchParams(search).get("id");

  const trainerURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  const matchURL = "https://powerful-sierra-82767.herokuapp.com/matches";

  React.useEffect(() => {
    axios.get(trainerURL + cardID).then((response) => {
      setTrainer(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!trainer) return null;

  function Approve() {
    const matchObj = {
      user: localStorage.loggedUserID,
      trainer: cardID,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(matchURL, matchObj, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="mobile-main">
      <CardTop name={trainer.name} />
      <div
        style={{ backgroundImage: "url(" + trainer.photos[0] + ")" }}
        className="card-fw"
      >
        <div className="bottom-bar">
          <div className="bottom-bar-info">
            <h3>{trainer.name}</h3>
            <h4>{trainer.city.name}</h4>
          </div>

          {trainer.expert._id === "61a2255b0f5aeabad0e3785a" ? (
            <img src="/assets/handicap.svg" alt="Handicap" />
          ) : null}

          <h4>{trainer.experience} שנות נסיון</h4>
        </div>
      </div>

      <div className="breeds">
        <h5>מתמחה בגזעים:</h5>
        <span>{trainer.dogRace.name}</span>
      </div>

      <div className="expertise">
        <h5>התמחויות:</h5>
        <span>{trainer.expert.name}</span>
        </div>
        
          <div className="breeds">
          <h5>הטיפ שלי אליכם:</h5>
          <span>{trainer.tip}</span>
          </div>

          <div className="expertise">
          <h5>מחיר לשעת אילוף:</h5>
          <span>{trainer.pricing}</span>
          </div>

      <div className="decisions">
        <button className="btn-approve" onClick={Approve}>
          <img src="/assets/approve.svg" alt="Match" />
        </button>
        <button className="btn-decline">
          <img src="/assets/decline.svg" alt="No Match" />
        </button>
      </div>
    </div>
  );
}

export default CardInfo;
