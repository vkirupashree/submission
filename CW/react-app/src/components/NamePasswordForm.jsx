import React from "react";

class NamePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`NamePasswordForm Submitted: ${JSON.stringify(this.state)}`);
  };

  handleClear = () => {
    this.setState({ name: "", password: "" });
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
        <h3>LogIn Form</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="******"
            value={this.state.password}
               v vonChange={this.handleChange}
          />
          <div>
            <button type="submit" style={{ ...buttonStyle, background: "#28a745" }}>
              Login
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

export default NamePasswordForm;
