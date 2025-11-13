import React from "react";
import "./LoggedIn.css";

export default function LoggedIn({ location }) {
  // Get user from navigation state or localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location?.state?.user || storedUser;

  return (
    <div className="loggedin-page">
      <div className="loggedin-container">
        <h1>Logged in 🎉</h1>
        {user ? (
          <>
            <h2>Welcome, {user.username}!</h2>
            <p>
              Role: {user.roles && user.roles.length > 0
                ? user.roles.join(", ")
                : "No role assigned"}
            </p>
          </>
        ) : (
          <p>No user info available</p>
        )}
      </div>
    </div>
  );
}
