import React from "react";
import { useNavigate } from "react-router-dom";

function AdminTopBar() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  }

  return (
    <div  className="top-bar">
      <div className="grid">
        <h2>ברוך הבא, מנהל</h2>
        <button data-testid="button" onClick={logOut}>התנתקות מהמערכת</button>
      </div>
    </div>
  );
}

export default AdminTopBar;
