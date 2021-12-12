import React from "react";
import axios from "axios";

function TrainerRow(props) {

    let trainerId = props.id;

    const baseURL = "https://powerful-sierra-82767.herokuapp.com/trainers/"

    function Approve() {
        axios.patch(baseURL + trainerId, { //patch update data in the server
            verifiedStatus: true
        }).then((response) => {
            console.log(response);
        })
    }
    function Decline() {
        axios.delete(baseURL + trainerId).then((response) => {
            console.log(response);
        })
    }

   
    return(
        <div className="trainer-row">
            <img src="/assets/sample.png" />
            <h2>{props.name}</h2>
            <h3>{props.location}</h3>
            <h3>{props.exp} שנים</h3>
            <button className="btn-approve" onClick={Approve}>
                <img src="/assets/approve.svg"/>
            </button>
            <button className="btn-decline" onClick={Decline}>
                <img src="/assets/decline.svg"/>
            </button>
        </div>
    )
}

export default TrainerRow;