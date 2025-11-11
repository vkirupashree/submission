import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <span onClick={() => navigate("/")}>Home</span>
      <span onClick={() => navigate("/about")}>About Me</span>
      <span onClick={() => navigate("/contact")}>Contact</span>
    </div>
  );
}
