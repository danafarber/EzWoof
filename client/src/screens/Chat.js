import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatListUser from "../components/Chat/ChatListUser";
import axios from "axios";
import ChatListTrainer from "../components/Chat/ChatListTrainer";

function Chat() {
  const navigate = useNavigate();

  const [chats, setChats] = useState();
  const userID = localStorage.userID;
  const trainerID = localStorage.trainerID;

  let isUser = localStorage.userLoggedIn;
  let isTrainer = localStorage.trainerLoggedIn;

  const chatsURL = "https://powerful-sierra-82767.herokuapp.com/chats/";
  React.useEffect(() => {
    axios.get(chatsURL).then((response) => {
      setChats(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!chats) return null;

  let userChats = [];
  let trainerChats = [];

  function popUserChats() {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].match.user._id === userID) {
        userChats.push(chats[i]);
      }
    }
  }

  function popTrainerChats() {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].match.trainer._id === trainerID) {
        trainerChats.push(chats[i]);
      }
    }
  }

  if (userID) {
    popUserChats();
    console.log(userChats);
  }

  if (trainerID) {
    popTrainerChats();
    console.log(trainerChats);
  }

  return (
    <div className="mobile-main">
      <div className="card-top">
        <h1>המסנג׳ר שלי</h1>
        <img
          src="../assets/back.svg"
          alt="Back"
          onClick={() => navigate("/cards")}
        />
      </div>

      {isUser ? <ChatListUser userChats={userChats} /> : null}
      {isTrainer ? <ChatListTrainer trainerChats={trainerChats} /> : null}
    </div>
  );
}

export default Chat;
