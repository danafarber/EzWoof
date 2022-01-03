import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/chat">
        <button className="btn-chat">
          <img src="/assets/chat.svg" alt="Chat" />
        </button>
      </Link>

      <Link to="/settings">
        <button className="btn-settings">
          <img src="/assets/settings.svg" alt="Settings" />
        </button>
      </Link>
    </div>
  );
}

export default NavBar;
