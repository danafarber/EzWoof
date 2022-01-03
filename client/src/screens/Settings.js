import React from "react";
import TrainerSettings from "../components/Users/TrainerSettings";
import UserSettings from "../components/Users/UserSettings";

function Settings() {
  let isUser = localStorage.userLoggedIn;
  let isTrainer = localStorage.trainerLoggedIn;

  return (
    <> 
      
      {isUser ? <UserSettings /> : null}
      {isTrainer ? <TrainerSettings /> : null}
    </>
  );
}

export default Settings;
