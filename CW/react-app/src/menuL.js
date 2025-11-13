import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";

export default function MenuL() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // Show menuL only if NOT logged in and on allowed pages
  const allowedPaths = ["/", "/home", "/about"];
  if (token || !allowedPaths.includes(location.pathname)) return null;

  return (
    <div className="menu">
      <div className="menu-left">
        {/* New LP link */}
        <span onClick={() => navigate("/")}>LP</span>
        <span onClick={() => navigate("/home")}>Home</span>
        <span onClick={() => navigate("/about")}>About Me</span>
      </div>
      <div className="menu-right">
        <span onClick={() => navigate("/login")}>LogIn</span>
      </div>
    </div>
  );
}
