import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

function TrainerRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";

    function RegisterTrainer() {

        const trainerObj = {
            name: 'null',
            email: email,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json'
          }
          

        axios.post(trainersURL, trainerObj, {
            headers: headers
        })
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }


    return(
<>
        <form>
                <input id="loginEmail" value={email} onInput={e => setEmail(e.target.value)} type="email" placeholder="דואר אלקטרוני"></input>
                <input id="loginPassword" value={password} onInput={e => setPassword(e.target.value)} type="password" placeholder="סיסמא"></input>
                <input type="submit" value="הרשמה" onClick={RegisterTrainer}></input>
            </form>
            <Link to="/login"><h4>יש לי חשבון, עבור להתחברות</h4></Link>
    </>
    )
}

export default TrainerRegister;