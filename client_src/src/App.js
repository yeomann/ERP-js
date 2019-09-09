import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { loginRoute } from "./routes";
import EnsureLoggedInContainer from "./EnsureLoggedInContainer";
// import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

export default () => (
  <Router basename={""}>
    <div>
      <ToastContainer />
      <Route component={loginRoute.component} path={loginRoute.path} />
      <Route component={EnsureLoggedInContainer} />
    </div>
  </Router>
);
