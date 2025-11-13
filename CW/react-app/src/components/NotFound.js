import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams(); // not used here, but shows you can read URL params

  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page <strong>{location.pathname}</strong> doesn’t exist.
      </p>
      <button onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
}
