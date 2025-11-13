// src/components/Popup.jsx
import React from "react";
import "./Popup.css";

export default function Popup({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{message}</h3>
      </div>
    </div>
  );
}
