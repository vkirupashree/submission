import React from "react";
import CounterDisplay from "./CounterDisplay";

class CounterButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }; // default value
  }

  increment = () => {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };

  decrement = () => {
    this.setState((prevState) => ({ counter: prevState.counter - 1 }));
  };

  render() {
    const buttonStyle = {
      padding: "0.5rem 1rem",
      margin: "0 10px",
      background: "#ff9100ff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    };

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button style={buttonStyle} onClick={this.increment}>
          Increment +
        </button>
        <button style={buttonStyle} onClick={this.decrement}>
          Decrement -
        </button>

        {/* Display counter */}
        <CounterDisplay count={this.state.counter} />
      </div>
    );
  }
}

export default CounterButtons;
