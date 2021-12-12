import React from "react";

function AdminTopBar() {

    function logOut() {
        localStorage.removeItem("adminLoggedIn");
        window.location.href = "http://localhost:3000/admin";
    }

    return(
        <div className="top-bar">
            <div className="grid">
            <h2>ברוך הבא, מנהל</h2>
            <button onClick={logOut}>התנתקות מהמערכת</button>
            </div>
        </div>
    )
}

export default AdminTopBar;