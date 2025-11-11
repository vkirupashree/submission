import React from "react";
import ClickCounter from "./ClickCounter";

class ClickButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clickCount: 0 };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));
  };

  render() {
    const buttonStyle = {
      padding: "0.6rem 1.2rem",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    };

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button style={buttonStyle} onClick={this.handleClick}>
          Click
        </button>

        {/* Display the count */}
        <ClickCounter count={this.state.clickCount} />
      </div>
    );
  }
}

export default ClickButton;
