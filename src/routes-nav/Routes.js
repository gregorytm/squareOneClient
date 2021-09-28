import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectList from "../projects/ProjectList";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SingupForm";

/** Project detail page
 *
 * Renders informatin about Project
 *
 * Routed at /project/:handle
 *
 * Routes -> ProjectDetail => ChamberCardList
 */

function Routes({ login, signup }) {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SingupForm signup={signup} />
        </Route>

        <Route exact path="/projects">
          <ProjectList />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
