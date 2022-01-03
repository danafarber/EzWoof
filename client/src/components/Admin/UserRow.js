import React from "react";
import axios from "axios";

function UserRow(props) {
  let userId = props.id;

  const baseURL = "https://powerful-sierra-82767.herokuapp.com/users/";

  function Decline() {
    axios.delete(baseURL + userId).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="user-row">
      <h2>
        {props.first_name} {props.last_name}
      </h2>
      <button className="btn-decline" onClick={Decline}>
        <img src="/assets/decline.svg" alt="Decline" />
      </button>
    </div>
  );
}

export default UserRow;
