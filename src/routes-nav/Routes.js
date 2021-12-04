import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectList from "../projects/ProjectList";
// import ChamberList from "../chamber/ChamberList";
import ChamberDetail from "../chamber/ChamberDetail";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import ProjectDetail from "../projects/ProjectDetail";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes
 *
 * Parts of the site should only be visiable when logged in  Those routes are wrapped by
 * <PrivateRoute>, which is an authorizaion component
 *
 * visiting non-existant route redirects to the homepage
 */

function Routes({ login, signup }) {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/projects/active">
          <ProjectList />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:id">
          <ProjectDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:id/chamber/:id">
          <ChamberDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:id/chamber/:id/material">
          <ChamberDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/chamber/:id">
          <ChamberDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default Routes;
