import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
const users = ({ users, loading }) => {
  let html = null;
  if (loading) {
    html = <Spinner />;
  } else {
    html = (
      <div style={userStyle}>
        {users.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </div>
    );
  }
  return html;
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};
export default users;
