import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const BASE_URL = "https://localhost:7146";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        const error = await response.text();
        alert(`Registration failed: ${error}`);
        return;
      }

      const data = await response.json();
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration error. Make sure backend is running.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register New Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <div className="login-link" onClick={() => navigate("/login")}>
          Already have an account? Log in
        </div>
      </div>
    </div>
  );
}
