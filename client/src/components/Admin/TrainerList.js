import React, { useState } from "react";
import TrainerRow from "./TrainerRow";
import axios from "axios";

function TrainerList(props) {

    let unvTrainers = props.unvTrainers


    return(
        <div class="trainers">
               {unvTrainers.map(function(trainer, index){
                   return <TrainerRow id={trainer._id} name={trainer.name} location={trainer.location} exp={trainer.experience} key={index}/>
               })}
        </div>
    )
}

export default TrainerList;