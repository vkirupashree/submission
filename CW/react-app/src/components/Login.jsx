import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "./Login.css"; // use CSS file for styling

const BASE_URL = "https://localhost:7146";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setPopupMessage("Logging in...");
    setShowPopup(true);

    try {
      const response = await fetch(`${BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPopupMessage("Oops! Invalid Credentials.");
        setTimeout(() => setShowPopup(false), 1500);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      setTimeout(() => {
        setShowPopup(false);
        navigate("/loggedin", { state: { user: data } });
      }, 1000);
    } catch (err) {
      console.error(err);
      setPopupMessage("Oops! Invalid Credentials.");
      setTimeout(() => setShowPopup(false), 1500);
    }
  };

  const handleReset = () => {
    setUsernameOrEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome to Log-In Page</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-buttons">
            <button type="submit">LogIn</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>

          {/* Home Button */}
          <div className="login-home-button">
            <button type="button" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </form>

        <div className="login-link" onClick={() => navigate("/register")}>
          Don't have an account? Register Now
        </div>
      </div>

      <Popup visible={showPopup} message={popupMessage} />
    </div>
  );
}
