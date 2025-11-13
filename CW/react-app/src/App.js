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

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css";
// import Menu from "./Menu";
// import Home from "./components/Home";
// import AboutMe from "./components/AboutMe";
// import Contact from "./components/Contact";
// import DemoPage from "./components/DemoPage";
// import NotFound from "./components/NotFound";
// import Login from "./components/Login";
// import FetchPage from "./components/FetchPage";
// import LoggedIn from "./components/LoggedIn";
// import Register from "./components/Register";

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Menu />
//         <Routes>
//           {/* <Route path="/" element={<Home />} /> */}
//           <Route path="/" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<AboutMe />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/fetch" element={<FetchPage />} />
//           <Route path="/demo" element={<DemoPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/loggedin" element={<LoggedIn />} />

//           {/* 👇 Wrong path */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Menu from "./Menu";
import MenuL from "./menuL";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import DemoPage from "./components/DemoPage";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import FetchPage from "./components/FetchPage";
import LoggedIn from "./components/LoggedIn";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="app">
        {/* 👇 Public menu for visitors */}
        <MenuL />

        {/* 👇 Main menu for logged-in users */}
        <Menu />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fetch"
            element={
              <ProtectedRoute>
                <FetchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/demo"
            element={
              <ProtectedRoute>
                <DemoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loggedin"
            element={
              <ProtectedRoute>
                <LoggedIn />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
