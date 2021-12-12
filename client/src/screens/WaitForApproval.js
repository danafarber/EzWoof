import React from "react";

function WaitForApproval(props) {

    let name = props.name;

 return(
    <div data-testid="waitForApproval" className="main">
        <img className="welcome-img" src="../assets/waitApproval.png" ></img>
        <h1 className="welcome-msg">היי {name}! </h1>
        <p className="content"> 
        
        תודה שנרשמת לשירות!
        כחלק מהמודרציה המופעלת באפליקציה,
        אנו עוברים על כל הפרטים ומאשרים בהתאם.
         אנא המתן למייל.
        </p>

    </div>
  
 )



}

export default WaitForApproval;