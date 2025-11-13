import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";
import Popup from "./components/Popup";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // ✅ Show menu ONLY when logged in
  if (!isLoggedIn) return null;

  const handleLogout = () => {
    setShowLogoutPopup(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setShowLogoutPopup(false);
      navigate("/"); // redirect to landing page
    }, 1000);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="menu">
        <div className="menu-left">
          <span onClick={() => navigate("/home")}>Home</span>
          <span onClick={() => navigate("/about")}>About Me</span>
          <span onClick={() => navigate("/contact")}>Contact</span>
          <span onClick={() => navigate("/fetch")}>Fetch</span>
          <span onClick={() => navigate("/demo")}>Demo Page</span>
        </div>
        <div className="menu-right">
          <span
            className="user-info"
            onClick={() => navigate("/loggedin")}
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
            Hello, {user?.username}{" "}
            {user?.roles?.length > 0 ? `(${user.roles.join(", ")})` : ""}
          </span>
          <span onClick={handleLogout}>LogOut</span>
        </div>
      </div>

      <Popup visible={showLogoutPopup} message="Logging out..." />
    </>
  );
}
