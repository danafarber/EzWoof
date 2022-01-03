import React from "react";
import UserRow from "./UserRow";

function UserList(props) {
  let users = props.users;

  return (
    <div class="users">
      <h2 className="headlines">משתמשים</h2>
      {users.map(function (user, index) {
        return (
          <UserRow
            id={user._id}
            first_name={user.name}
            last_name={user.last_name}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default UserList;
