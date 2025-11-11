import React from "react";

class ClickCounter extends React.Component {
  render() {
    const { count } = this.props;

    return (
      <div style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
        Button clicked: {count} times
      </div>
    );
  }
}

export default ClickCounter;
