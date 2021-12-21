import React, { useState } from "react";
import AdminTopBar from "../components/Admin/AdminTopBar";
import axios from "axios";
import TrainerList from "../components/Admin/TrainerList";
import UserList from "../components/Admin/UserList";
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

  const navigate = useNavigate();

  const [trainers, setTrainers] = useState();
  const [users, setUsers] = useState();
  const [matches, setMatches] = useState();

  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  const usersURL = "https://powerful-sierra-82767.herokuapp.com/users/";
  const matchesURL = "https://powerful-sierra-82767.herokuapp.com/matches/";

  React.useEffect(() => {
    axios.get(trainersURL).then((response) => {
      setTrainers(response.data);
    });
    axios.get(usersURL).then((response) => {
      setUsers(response.data);
    });
    axios.get(matchesURL).then((response) => {
      setMatches(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!trainers) return null;
  if (!users) return null;
  if (!matches) return null;

  const trainersCount = trainers.length;
  const usersCount = users.length;
  const matchesCount = matches.length;

  function checkLoginStatus() {
    const lsValidate = localStorage.hasOwnProperty("adminLoggedIn");

    if (lsValidate) {
      console.log("Admin Logged Sucssefully");
    } else {
      navigate("/admin")
    }
  }
  checkLoginStatus();

  let unvTrainers = [];

  function popUnvTrainers() {
    for (let i = 0; i < trainers.length; i++) {
      if (trainers[i].verifiedStatus === false) {
        unvTrainers.push(trainers[i]);
      }
    }
  }

  popUnvTrainers();

  return (
    <div className="dashboard-container">
      <AdminTopBar />

      <div className="stats">
        <div className="usersCount">
          <h2>{usersCount}</h2>
          <h3>בעלי-כלבים רשומים</h3>
        </div>
        <div className="trainersCount">
          <h2>{trainersCount}</h2>
          <h3>מאלפים רשומים</h3>
        </div>
        <div className="matchesCount">
          <h2>{matchesCount}</h2>
          <h3>שידוכים שנוצרו</h3>
        </div>
      </div>

      <div className="admin-list">
        <div className="grid">
          <TrainerList unvTrainers={unvTrainers} />
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
