import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, submitForm, resetForm } from "../formSlice.js";

const FormComponent = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm());
    setShowSuccess(true);
  };

  const handleReset = () => {
    dispatch(resetForm());
    setShowSuccess(false);
  };

  const inputStyle = {
    padding: "0.5rem",
    margin: "8px 0",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    margin: "10px 5px 0 0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#fff",
  };

  const containerStyle = {
    border: "2px solid #007bff",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "300px",
    backgroundColor: "#fafafa",
    textAlign: "center",
    boxSizing: "border-box",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <h4>Form Component 📝</h4>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username || ""}
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email || ""}
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
        />
        {showSuccess && (
        <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
          Form Submitted Successfully 🎉!
        </p>
      )}
        <div>
          <button type="submit" style={{ ...buttonStyle, background: "#28a745" }}>
            Submit
          </button>
          <button
            type="button"
            style={{ ...buttonStyle, background: "#dc3545" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      {/* {showSuccess && (
        <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
          Form Submitted Successfully!
        </p>
      )} */}
    </div>
  );
};

export default FormComponent;
