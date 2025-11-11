import React from "react";

class TimerWithColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      color: "blue",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({ time: new Date() });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  }

  render() {
    const containerStyle = {
      border: "2px solid #000000ff",
      borderRadius: "10px",
      padding: "20px",
      width: "250px",
      textAlign: "center",
      backgroundColor: "#fafafa",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      margin: "20px auto",
    };

    const timeStyle = {
      fontSize: "2rem",
      fontWeight: "bold",
      color: this.state.color,
      marginBottom: "15px",
    };

    const selectStyle = {
      padding: "0.5rem",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    };

    const selectedColorStyle = {
      color: this.state.color,
      fontWeight: "bold",
    };

    return (
      <div style={containerStyle}>
        <div style={timeStyle}>{this.formatTime(this.state.time)}</div>
        <select
  style={selectStyle}
  value={this.state.color}
  onChange={this.handleColorChange}
>
  <option value="blue">Blue</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="yellow">Yellow</option>
  <option value="#ff00a2ff">Pink</option>
</select>
<div>
  Selected Color: <span style={selectedColorStyle}>{this.state.color === "#ff00a2ff" ? "Pink" : this.state.color.charAt(0).toUpperCase() + this.state.color.slice(1)}</span>
</div>
      </div>
    );
  }
}

export default TimerWithColor;
