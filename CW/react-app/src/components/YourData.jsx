import React from "react";

class YourData extends React.Component {
  render() {
    const { submittedData } = this.props;

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

    const colorBoxStyle = {
      display: "inline-block",
      width: "20px",
      height: "20px",
      marginLeft: "5px",
      verticalAlign: "middle",
      border: "1px solid #ccc",
    };

    return (
      <div style={containerStyle}>
        <h3>Your Data</h3>
        {submittedData ? (
          <div style={{ textAlign: "left" }}>
            <p>
              <strong>Name:</strong> {submittedData.username}
            </p>
            <p>
              <strong>Email ID:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Password:</strong> {submittedData.password}
            </p>
            <p>
              <strong>Selected Color:</strong>{" "}
              <span style={colorBoxStyle} title={submittedData.color} >
                <span style={{ display: "inline-block", width: "14px", height: "14px", backgroundColor: submittedData.color }}></span>
              </span>{" "}
              {submittedData.color}
            </p>
          </div>
        ) : (
          <p>No registered data has been submitted yet.</p>
        )}
      </div>
    );
  }
}

export default YourData;
