import React from "react";

class DynamicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      color: "#000000ff", // default color
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmitCallback) {
      this.props.onSubmitCallback(this.state);
    }
    alert(`DynamicForm Submitted: ${JSON.stringify(this.state)}`);
  };

  handleClear = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      color: "#080808ff",
    });
  };

  render() {
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

    return (
      <div style={containerStyle}>
        <h3>Dynamic Form</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div style={{ margin: "8px 0" }}>
            <label htmlFor="colorPicker">Choose a color: </label>
            <input
              id="colorPicker"
              style={{ ...inputStyle, padding: "0", height: "40px" }}
              type="color"
              name="color"
              value={this.state.color}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" style={{ ...buttonStyle, background: "#28a745" }}>
              Submit
            </button>
            <button
              type="button"
              style={{ ...buttonStyle, background: "#dc3545" }}
              onClick={this.handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DynamicForm;
