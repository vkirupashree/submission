import React from "react";
import DynamicForm from "./DynamicForm";
import NamePasswordForm from "./NamePasswordForm";
import YourData from "./YourData";

class MainRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedData: null,
    };
  }

  handleFormSubmit = (data) => {
    this.setState({ submittedData: data });
  };

  render() {
    const outerBox = {
      border: "3px solid #343a40",
      borderRadius: "12px",
      padding: "30px",
      margin: "50px auto",
      width: "90%",
      maxWidth: "1000px",
      backgroundColor: "#f0f4f8",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    };

    const rowStyle = {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch",
      gap: "20px",
      flexWrap: "wrap",
    };

    return (
      <div style={outerBox}>
        <div style={rowStyle}>
          <DynamicForm onSubmitCallback={this.handleFormSubmit} />
          <NamePasswordForm />
          <YourData submittedData={this.state.submittedData} />
        </div>
      </div>
    );
  }
}

export default MainRow;
