import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function TrainerLogin() {
  const navigate = useNavigate();
  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";

  const [trainer, setTrainer] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    axios.get(trainersURL).then((response) => {
      setTrainer(response.data);
    });
    // eslint-disable-next-line
  }, []);

  if (!trainer) return null;

  function AuthenticateLogin(e) {
    e.preventDefault();

    const authObj = Object.values(trainer);
    for (let index = 0; index < authObj.length; index++) {
      if (
        authObj[index].email === email &&
        authObj[index].password === password
      ) {
        alert(" Welcome " + email + "!");
        localStorage.setItem("trainerLoggedIn", true);
        localStorage.setItem("trainerID", authObj[index]._id);
        navigate("/chat");
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

export default TrainerLogin;
