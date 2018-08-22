import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import Router from './Router';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);