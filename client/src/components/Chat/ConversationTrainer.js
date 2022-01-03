import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ConversationTrainer(props) {
  const navigate = useNavigate();

  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState("");
  const search = useLocation().search;
  let chatID = new URLSearchParams(search).get("id");

  const trainerID = localStorage.trainerID;

  const getConversation = async () => {
    try {
      axios.get(chatsURL + chatID).then((response) => {
        setConversation(response.data);
      });
    
    } catch (err) {
      console.error(err.message);
    }
  };

  const chatsURL = "https://powerful-sierra-82767.herokuapp.com/chats/";
  React.useEffect(() => {

    getConversation();

    const interval=setInterval(()=>{
      getConversation()
     },1000)
       
       
     return()=>clearInterval(interval)
    // eslint-disable-next-line
  }, []);
  if (!conversation) return null;

  let Messages;
  Messages = conversation.messages;


  function SendMessage(e) {
    e.preventDefault();

    const messageObj = {
      messages: {
        sender_id: trainerID,
        msg: message,
      }
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .patch(chatsURL + chatID, messageObj, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setMessage("");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="mobile-main">
      <div className="card-top">
        <h1>{conversation.match.user.name}</h1>
        <img
          src="../../assets/back.svg"
          alt="Back"
          onClick={() => navigate("/chat")}
        />
      </div>
      <div className="conversation">
        {Messages.map((message, index) => {
          return (
            <div
              key={index}
              className={
                trainerID === message.sender_id
                  ? "chat-bubble-me"
                  : "chat-bubble"
              }
            >
              {message.msg}
            </div>
          );
        })}
      </div>

      <div className="sendMsg">
        <input
          type="text"
          id="msg"
          value={message}
          onInput={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="שליחה" onClick={SendMessage} />
      </div>
    </div>
  );
}

export default ConversationTrainer;
