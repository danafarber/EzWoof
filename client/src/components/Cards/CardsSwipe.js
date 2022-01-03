import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { Link } from "react-router-dom";

function CardsSwipe(props) {
  let verifiedTrainers = props.verifiedTrainers;

  const matchURL = "https://powerful-sierra-82767.herokuapp.com/matches";

  const chatsURL = "https://powerful-sierra-82767.herokuapp.com/chats";

  const [lastDirection, setLastDirection] = useState();

  function swiped(direction, idSwiped) {
    setLastDirection(direction);

    const matchObj = {
      user: props.loggedUserID,
      trainer: idSwiped,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(matchURL, matchObj, {
        headers: headers,
      })
      .then((response) => {
        const headers = {
          "Content-Type": "application/json",
        };
        // Create Chat
        axios
          .post(
            chatsURL,
            {
              match: response.data._id,
              messages: {
                sender_id: props.loggedUserID,
                msg: "היי, אשמח שנדבר!"
              }
            },
            {
              headers: headers,
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>
      {verifiedTrainers.map(function (trainer, index) {
        return (
          <TinderCard
            className="swipe"
            key={index}
            onSwipe={(dir) => swiped(dir, trainer._id)}
            onCardLeftScreen={() => outOfFrame(trainer._id)}
            trainer={trainer}
          >
            <div
              style={{ backgroundImage: "url(" + trainer.photos[0] + ")" }}
              className="card"
            >
              <Link to={`/card?id=${trainer._id}`}>
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
              </Link>
            </div>
          </TinderCard>
        );
      })}
    </>
  );
}

export default CardsSwipe;
