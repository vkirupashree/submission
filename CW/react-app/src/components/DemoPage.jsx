// src/components/DemoPage.jsx
import React from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import TodoList from "./TodoList";
import PopupExample from "./PopupExample";
import ClickButton from "./ClickButton";
import CounterButtons from "./CounterButtons";
import FormContainer from "./FormContainer";
import TimerWithColor from "./TimerWithColor";
import MainRow from "./MainRow";
import ApiButton1 from "./ApiButton1";
import ApiButton2 from "./ApiButton2";
import ApiButton3 from "./ApiButton3";

class DemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      popupMessage: "",
      popupClickCount: 0,
    };
  }

  handleOpenPopup = (number) => {
    this.setState((prevState) => ({
      showPopup: true,
      popupMessage: `Hello from the PopUp #${number}`,
      popupClickCount: prevState.popupClickCount + 1,
    }));
  };

  handleClosePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const buttonStyle = {
      padding: "0.5rem 1rem",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      margin: "0 10px",
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Header />
        <SubHeader />
        <TodoList />

        <div style={{marginTop: "40px", border: "3px solid #00244aff",
            borderRadius: "15px",
            padding: "20px",
            maxWidth: "40%",
            margin: "20px auto",
            //backgroundColor: "#f6f6f6ff",
            boxSizing: "border-box", }}>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              style={buttonStyle}
              onClick={() => this.handleOpenPopup(num)}
            >
              Open Popup {num}
            </button>
          ))}
        

        <p style={{ marginTop: "10px", fontSize: "16px" }}>
          Total popup opens: {this.state.popupClickCount}
        </p>
          
        <PopupExample
          show={this.state.showPopup}
          message={this.state.popupMessage}
          onClose={this.handleClosePopup}
        />

        <ClickButton />
        </div>
        <CounterButtons />
        <MainRow />
        <TimerWithColor />

        <div
          style={{
            border: "3px solid #007bff",
            borderRadius: "15px",
            padding: "20px",
            maxWidth: "75%",
            margin: "20px auto",
            backgroundColor: "#f0f8ff",
            boxSizing: "border-box",
          }}
            >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Form Container (Redux)
          </h2>
          <FormContainer />
        </div>
        <div style={{ marginTop: "40px", border: "3px solid #007bff",
            borderRadius: "15px",
            padding: "20px",
            maxWidth: "50%",
            margin: "20px auto",
            //backgroundColor: "#f6f6f6ff",
            boxSizing: "border-box", }}>
            <h2>API Demo Buttons using Jest & React Testing Library</h2>
            <h3>ApiButtons Test Status: ✅ All test cases and coverage passed</h3>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
  <ApiButton1 api={(endpoint) => Promise.resolve("API 1 is called")} />
  <ApiButton2 api={async (endpoint) => "API 2 is called"} />
  <ApiButton3 api={() => {}} /> {/* Already handles setTimeout inside */}
</div>
            </div>

      </div>
    );
  }
}

export default DemoPage;
