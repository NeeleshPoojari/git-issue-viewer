import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SingleIssue from "./component/SingleIssue";
import App from "./App";
import NotFound from "./component/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/issue/:IssueId" component={SingleIssue} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
export default Router;
