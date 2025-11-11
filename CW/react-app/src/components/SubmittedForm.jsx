import React from "react";
import { useSelector } from "react-redux";

const SubmittedForm = () => {
  const formData = useSelector((state) => state.form.data);
  const submitted = useSelector((state) => state.form.submitted);

  const containerStyle = {
    border: "2px solid #28a745",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "300px",
    backgroundColor: "#f4fff4",
    textAlign: "left",
    boxSizing: "border-box",
    marginTop: "20px",
    minHeight: "180px", // ensures consistent box size
  };

  const waitingStyle = {
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "40px",
  };

  return (
    <div style={containerStyle}>
      <h4>Submitted Form ✅(Subscribed to Redux)</h4>
      {submitted ? (
        <div>
          <p>
            <strong>User Name:</strong> {formData.username}
          </p>
          <p>
            <strong>Email ID:</strong> {formData.email}
          </p>
          <p>
            <strong>Password:</strong> {formData.password}
          </p>
        </div>
      ) : (
        <p style={waitingStyle}>Waiting for submission...</p>
      )}
    </div>
  );
};

export default SubmittedForm;
