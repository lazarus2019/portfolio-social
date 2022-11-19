import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Commented strict mode for drag n drop
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
