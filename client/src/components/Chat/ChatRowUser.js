import React from "react";

function ChatRowUser(props) {
    return(
        <div className="chat-row">
            <img src={props.photo} alt={props.name}/>
            <div className="chat-details">
            <h2>{props.name}</h2>
            <p>לחץ כדי לדבר עם {props.name}.</p>
            </div>
        </div>
    )
}

export default ChatRowUser;