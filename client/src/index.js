import React from "react";
import ReactDOM from "react-dom";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import AdminLogin from "./screens/AdminLogin";

import Home from "./screens/Home";
import WaitForApproval from "./screens/WaitForApproval";
import Login from "./screens/Login";
import Register from "./screens/Register";
import TrainerProfileUpdate from "./screens/TrainerProfileUpdate";
import UserProfileUpdate from "./screens/userProfileUpdate";
import "./utils/global.css";
import reportWebVitals from "./reportWebVitals";
import AdminDashboard from "./screens/AdminDashboard";
import Cards from "./screens/Cards";
import CardInfo from "./screens/CardInfo";
import Settings from "./screens/Settings";
import Chat from "./screens/Chat";
import ConversationTrainer from "./components/Chat/ConversationTrainer";
import ConversationUser from "./components/Chat/ConversationUser";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin" element={<AdminLogin />}></Route>
        <Route exact path="login" element={<Login />}></Route>
        <Route exact path="register" element={<Register />}></Route>
        <Route path="card" element={<CardInfo />}></Route>
        <Route exact path="settings" element={<Settings />}></Route>
        <Route exact path="chat" element={<Chat />}></Route>
        <Route path="chat/trainer" element={<ConversationTrainer />}></Route>
        <Route path="chat/user" element={<ConversationUser />}></Route>
        <Route
          exact
          path="register/user-profile"
          element={<UserProfileUpdate />}
        ></Route>
        <Route
          exact
          path="register/trainer-profile"
          element={<TrainerProfileUpdate />}
        ></Route>
        <Route
          exact
          path="register/wait-for-approval"
          element={<WaitForApproval />}
        ></Route>
        <Route
          exact
          path="admin/dashboard"
          element={<AdminDashboard />}
        ></Route>
        <Route exact path="cards" element={<Cards />}></Route>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
