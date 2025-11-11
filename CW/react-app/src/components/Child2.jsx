import React from "react";
import SubmittedForm from "./SubmittedForm.jsx";
import { useSelector } from "react-redux";

const Child2 = () => {
  const formData = useSelector((state) => state.form.data);
  const submitted = useSelector((state) => state.form.submitted);

  const containerStyle = {
    border: "2px solid #007bff",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "300px",
    backgroundColor: "#fafafa",
    textAlign: "left",
    boxSizing: "border-box",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={containerStyle}>
        <h4>Read-only View 📄</h4>
        {Object.keys(formData).length > 0 ? (
          <div>
            <p>
              <strong>User Name:</strong> {formData.username || ""}
            </p>
            <p>
              <strong>Email ID:</strong> {formData.email || ""}
            </p>
            <p>
              <strong>Password:</strong> {formData.password || ""}
            </p>
          </div>
        ) : (
          <p>Waiting for input...</p>
        )}
      </div>

      {/* New Submitted Form section below */}
      <SubmittedForm />
    </div>
  );
};

export default Child2;
