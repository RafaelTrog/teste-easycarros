import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Login";
import List from "./List";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PrivateRoute path="/consulta" component={List} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
