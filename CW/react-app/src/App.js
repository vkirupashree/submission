// import React from "react";
// import Header from "./components/Header";
// import SubHeader from "./components/SubHeader";
// import TodoList from "./components/TodoList";
// import PopupExample from "./components/PopupExample";
// import ClickButton from "./components/ClickButton";
// import CounterButtons from "./components/CounterButtons";
// import FormContainer from "./components/FormContainer";
// import TimerWithColor from "./components/TimerWithColor";
// import MainRow from "./components/MainRow";
// import HorizontalMenu from "./components/HorizontalMenu";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showPopup: false,
//       popupMessage: "",
//       popupClickCount: 0,
//     };
//   }

//   handleOpenPopup = (number) => {
//     this.setState((prevState) => ({
//       showPopup: true,
//       popupMessage: `Hello from the PopUp #${number}`,
//       popupClickCount: prevState.popupClickCount + 1,
//     }));
//   };

//   handleClosePopup = () => {
//     this.setState({ showPopup: false });
//   };

//   render() {
//     const buttonStyle = {
//       padding: "0.5rem 1rem",
//       background: "#007bff",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontSize: "16px",
//       margin: "0 10px",
//     };

//     return (
//       <div style={{ textAlign: "center" }}>
//         <HorizontalMenu />
//         <Header />
//         <SubHeader />
//         <TodoList />

//         <div style={{ marginTop: "50px" }}>
//           {[1, 2, 3].map((num) => (
//             <button
//               key={num}
//               style={buttonStyle}
//               onClick={() => this.handleOpenPopup(num)}
//             >
//               Open Popup {num}
//             </button>
//           ))}
//         </div>

//         <p style={{ marginTop: "10px", fontSize: "16px" }}>
//           Total popup opens: {this.state.popupClickCount}
//         </p>

//         <PopupExample
//           show={this.state.showPopup}
//           message={this.state.popupMessage}
//           onClose={this.handleClosePopup}
//         />
        
//         <ClickButton />
//         <CounterButtons />
//         <MainRow />
//          <TimerWithColor /> 
//         <div
//   style={{
//     border: "3px solid #007bff",
//     borderRadius: "15px",
//     padding: "20px",
//     maxWidth: "75%",
//     margin: "20px auto",
//     backgroundColor: "#f0f8ff",
//     boxSizing: "border-box",
//   }}
// >
//   <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Form Container (Redux)</h2>
//   <FormContainer />
// </div>
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Menu from "./Menu";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

