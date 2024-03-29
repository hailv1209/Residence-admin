import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import answer from "./dashboard/answer";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));


const Login = lazy(() => import("./user-pages/Login"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/login" component={Login} />

          <Route path="/answer" component={answer} />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
