import React from "react";

class CounterDisplay extends React.Component {
  render() {
    const { count } = this.props;

    return (
      <div style={{ marginTop: "10px", fontSize: "18px", color: "#333" }}>
        Counter: {count}
      </div>
    );
  }
}

export default CounterDisplay;
