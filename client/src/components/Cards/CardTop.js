import React from "react";
import { useNavigate } from "react-router-dom";

function CardTop(props) {
  const navigate = useNavigate();

  return (
    <div className="card-top">
      <h1>{props.name}</h1>
      <img
        src="assets/back.svg"
        alt="Back"
        onClick={() => navigate("/cards")}
      />
    </div>
  );
}

export default CardTop;
