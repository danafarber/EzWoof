import React from "react";
import ChatRowUser from "./ChatRowUser";
import { Link } from "react-router-dom";

function ChatListUser(props) {
  let userChats = props.userChats;

  return (
    <div className="chat-list">
      {userChats.map(function (user, index) {
        return (
          <Link to={`/chat/user/?id=${user._id}`}>
          <ChatRowUser
            id={user.match.trainer._id}
            name={user.match.trainer.name}
            photo={user.match.trainer.photos[0]}
            key={index}
          />
          </Link>
        );
      })}
    </div>
  );
}

export default ChatListUser;
