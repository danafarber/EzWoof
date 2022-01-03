import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function WaitForApproval(props) {
  let name = props.name;

  const navigate = useNavigate();

  const [trainer, setTrainer] = useState();
  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  const trainerID = localStorage.trainerID;

  React.useEffect(() => {
    axios.get(trainersURL + trainerID).then((response) => {
      setTrainer(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!trainer) return null;

  if(trainer.verifiedStatus) {
    navigate("/chat");
  }

  return (
    <div data-testid="waitForApproval" className="mobile-main">
      <img
        className="welcome-img"
        src="../assets/waitApproval.png"
        alt="Welcome"
      ></img>
      <h1 className="welcome-msg">היי {name}! </h1>
      <p className="content">
        תודה שנרשמת לשירות! כחלק מהמודרציה המופעלת באפליקציה, אנו עוברים על כל
        הפרטים ומאשרים בהתאם. אנא המתן למייל.
      </p>
    </div>
  );
}

export default WaitForApproval;
