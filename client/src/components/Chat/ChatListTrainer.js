import React from "react";
import ChatRowTrainer from "./ChatRowUser";
import { Link } from "react-router-dom";

function ChatListTrainer(props) {
  let trainerChats = props.trainerChats;

  return (
    <div className="chat-list">

      {trainerChats.map(function (trainer, index) {
        return (
          <Link to={`/chat/trainer/?id=${trainer._id}`}>
          <ChatRowTrainer
            id={trainer.match.user._id}
            name={trainer.match.user.name}
            photo={trainer.match.user.photo}
            key={index}
          />
          </Link>
        );
      })}
    </div>
  );
}

export default ChatListTrainer;
