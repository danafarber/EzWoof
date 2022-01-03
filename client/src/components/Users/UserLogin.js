import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const usersURL = "https://powerful-sierra-82767.herokuapp.com/users/";

  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    axios.get(usersURL).then((response) => {
      setUser(response.data);
    });
    // eslint-disable-next-line
  }, []);

  if (!user) return null;

  function AuthenticateLogin(e) {
    e.preventDefault();

    const authObj = Object.values(user);
    for (let index = 0; index < authObj.length; index++) {
      if (
        authObj[index].email === email &&
        authObj[index].password === password
      ) {
        alert(" Welcome " + email + "!");
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("userID", authObj[index]._id);
        navigate("/cards");
        return true;
      }
    }
    alert("The password / email is incorrect");
  }

  return (
    <>
      <form>
        <input
          id="loginEmail"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="דואר אלקטרוני"
        ></input>
        <input
          id="loginPassword"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="סיסמא"
        ></input>
        <input
          type="submit"
          value="התחברות"
          onClick={AuthenticateLogin}
        ></input>
      </form>
      <Link to="/register">
        <h4>אין לי חשבון, עבור להרשמה</h4>
      </Link>
    </>
  );
}

export default UserLogin;
