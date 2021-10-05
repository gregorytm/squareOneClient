import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectList from "../projects/ProjectList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

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

        <Route exact path="/projects">
          <ProjectList />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
