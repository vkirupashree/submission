// import { createStore } from "redux";

// // Initial state
// const initialState = {
//   submittedData: null,
// };

// // Reducer
// function formReducer(state = initialState, action) {
//   switch (action.type) {
//     case "SUBMIT_FORM":
//       return { ...state, submittedData: action.payload };
//     case "RESET_FORM":
//       return { ...state, submittedData: null };
//     default:
//       return state;
//   }
// }

// // Create store
// const store = createStore(
//   formReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;

import { configureStore} from "@reduxjs/toolkit";
import formReducer from "./formSlice.js";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
