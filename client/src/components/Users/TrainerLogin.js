import React, { useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

function TrainerLogin() {

    const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";

    const [trainer, setTrainer] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    React.useEffect(() => {
        axios.get(trainersURL).then((response) => {
            setTrainer(response.data);
        })
        // eslint-disable-next-line
    }, []);

    if (!trainer) return null;

    function AuthenticateLogin(e) {
        const authObj =  Object.values(trainer);
        for (let index = 0; index < authObj.length; index++) {
           if(authObj[index].email===email && authObj[index].password===password){
                alert(' Welcome ' + email+ '!');
                return true;
           }
        }
        alert('The password / email is incorrect');
    }

    return(
        <>
        <form>
                <input id="loginEmail" value={email} onInput={e => setEmail(e.target.value)} type="email" placeholder="דואר אלקטרוני"></input>
                <input id="loginPassword" value={password} onInput={e => setPassword(e.target.value)} type="password" placeholder="סיסמא"></input>
                <input type="submit" value="התחברות" onClick={AuthenticateLogin}></input>
            </form>
            <div className="social_login">
                <button id="facebook_login">התחברות עם Meta <img src="../assets/meta.svg" alt="Meta" /></button>
                <button id="google_login">התחברות עם Google <img src="../assets/google.svg" alt="Google" /></button>   
            </div>
            <Link to="/register"><h4>אין לי חשבון, עבור להרשמה</h4></Link>
    </>
    )
}

export default TrainerLogin;