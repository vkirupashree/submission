import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import MainRow from "./components/MainRow.jsx";
import TimerWithColor from "./components/TimerWithColor.jsx";
import FormContainer from "./components/FormContainer.jsx";
import store from "./store.js";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    {/* <App /> */}
    {/* <MainRow />
    <TimerWithColor /> */}
    <Provider store={store}>
    <App />
  </Provider>
  </>
);
