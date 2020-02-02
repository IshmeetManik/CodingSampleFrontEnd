/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import "assets/css/material-dashboard-react.css?v=1.7.0";
import Login from "./components/login/login";
import PrivateRoute from "./components/privateRoute";
import Landing from "./components/login/landingPage";
import Register from "components/login/register";
import auth from "utils/auth";
import userTable from "views/userManagment/usersList";
import SignIn from "./components/login/sigin";
import SignUp from "components/login/signUp";
import Reset from "components/login/reset";
// Utils

const hist = createBrowserHistory();
console.log("Inside the index.js");
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/"
        render={props => <SignIn auth={auth} {...props} />}
        exact
      />
      <Route
        path="/login"
        render={props => <SignIn auth={auth} {...props} />}
        exact
      />
      <Route
        path="/register"
        render={props => <SignUp auth={auth} {...props} />}
      />
      <Route path="/reset" render={props => <Reset auth={auth} {...props} />} />
      <Route
        path="/reset/:organization/:email"
        render={props => <Reset auth={auth} {...props} />}
      />
      <PrivateRoute path="/admin" auth={auth} component={Admin} />

      <PrivateRoute
        path="/userManagment/managment"
        auth={auth}
        component={userTable}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
