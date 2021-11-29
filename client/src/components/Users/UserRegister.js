import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';


function UserRegister() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usersURL = "https://powerful-sierra-82767.herokuapp.com/users/";

    function RegisterUser() {

        const userObj = {
            name: 'null',
            pet_name: 'null',
            email: email,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json'
          }
          

        axios.post(usersURL, userObj, {
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
                <input type="submit" value="הרשמה" onClick={RegisterUser}></input>
            </form>
            <Link to="/login"><h4>יש לי חשבון, עבור להתחברות</h4></Link>
    </>
    )
}

export default UserRegister;