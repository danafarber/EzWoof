import React from "react";
import TrainerRow from "./TrainerRow";

function TrainerList(props) {
  let unvTrainers = props.unvTrainers;

  const unvCount = unvTrainers.length;

  return (
    <div class="trainers">
      <h2 className="headlines">מאלפים</h2>
      <h4>{unvCount} מאלפים ממתינים לאישור</h4>
      {unvTrainers.map(function (trainer, index) {
        return (
          <TrainerRow
            id={trainer._id}
            name={trainer.name}
            exp={trainer.experience}
            image={trainer.photos[0]}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default TrainerList;
