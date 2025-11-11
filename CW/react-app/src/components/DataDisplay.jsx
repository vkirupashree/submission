import React from "react";

class DataDisplay extends React.Component {
  render() {
    const { data } = this.props;
    const displayStyle = {
      border: "2px solid #ff9900",
      borderRadius: "10px",
      padding: "20px",
      width: "300px",
      textAlign: "center",
      backgroundColor: "#fff3e0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    };

    return (
      <div style={displayStyle}>
        <h3>Your Data:</h3>
        {data ? (
          <div>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Password:</strong> {data.password}</p>
          </div>
        ) : (
          <p>No data yet</p>
        )}
      </div>
    );
  }
}

export default DataDisplay;
