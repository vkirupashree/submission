import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
 
export default function LandingPage() {
  const navigate = useNavigate();
 
  return (
<div className="landing-container">
      {/* Animated background bubbles */}
<ul className="background-shapes">
<li></li><li></li><li></li><li></li><li></li>
</ul>
 
      <div className="landing-content">
<h1 className="fade-in">Welcome to the Landing Page! 🌟💻</h1>
<p className="fade-in delay-1">
          Experience a seamless login system with roles, secure authentication, and modern UI.
</p>
<div className="btn-group fade-in delay-2">
<button className="landing-login-btn" onClick={() => navigate("/login")}>
            Log In
</button>
{/* <button className="landing-secondary-btn" onClick={() => alert("Contact us at support@example.com")}>
            Contact Us
</button> */}
</div>
</div>
 
      {/* Feature Cards Section */}
<div className="feature-section">
<h2>Why Choose Our Platform?</h2>
<div className="features">
<div className="feature-card">
<h3>🔒 Secure Authentication</h3>
<p>Protect your data with multi-layered security and encrypted sessions.</p>
</div>
<div className="feature-card">
<h3>⚙️ Role-based Access</h3>
<p>Tailored dashboards and permissions for Admins, Users, and Guests.</p>
</div>
<div className="feature-card">
<h3>💡 Modern UI</h3>
<p>Enjoy a clean, intuitive interface built with React and Bootstrap 5.</p>
</div>
</div>
</div>
</div>
  );
}