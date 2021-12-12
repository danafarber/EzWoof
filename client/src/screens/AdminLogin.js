import React, { useState } from "react";
import axios from 'axios'
import '../utils/desktop.css'


function AdminLogin() {

    const adminsURL = "https://powerful-sierra-82767.herokuapp.com/admins/";

    const [admin, setAdmin] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    React.useEffect(() => {
        axios.get(adminsURL).then((response) => {
            setAdmin(response.data);
        })
        // eslint-disable-next-line
    }, []);

    if (!admin) return null;    

    function AuthenticateLogin(e) {
        e.preventDefault();

        const authObj =  Object.values(admin);
        for (let index = 0; index < authObj.length; index++) {
           if(authObj[index].email===email && authObj[index].password===password){
                localStorage.setItem("adminLoggedIn", true);
                localStorage.setItem("email", email)
                window.location.replace("http://localhost:3000/admin/dashboard");
           }
           else {
             alert('The password / email is incorrect');
           }
        }
    }

 

    return(
        <div data-testid="admin" className="main" >
            <img src="../assets/admin_logo.svg" alt="EZWOOF"/>
            <div className="login_form">
                <h1>התחברות למערכת הניהול</h1>
                <form>
                    <input id="loginEmail" type="email" placeholder="דואר אלקטרוני" value={email} onInput={e => setEmail(e.target.value)}></input>
                    <input id="loginPassword" type="password" placeholder="סיסמא" value={password} onInput={e => setPassword(e.target.value)}></input>
                    <input type="submit" value="התחברות" onClick={AuthenticateLogin}></input>
                </form>
            </div>
        </div>
    )
}





export default AdminLogin;