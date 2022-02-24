import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

import ProjectList from "../projects/ProjectList";
import ProfileForm from "../profiles/ProfileForm";
import ProjectDetail from "../projects/ProjectDetail";
import ProjectForm from "../projects/ProjectForm";
import ProjectInput from "../projects/ProjectInput";
import ProjectReports from "../projects/ProjectReports";

import ChamberForm from "../chamber/ChamberForm";
import ChamberDetail from "../chamber/ChamberDetail";
import ChamberReading from "../chamber/ChamberReading";

import DehuForm from "../dehu/DehuForm";
import DehuReading from "../dehu/DehuReading";
import DehuList from "../dehu/DehuList";

import MaterialReading from "../materials/MaterialReading";
import MaterialForm from "../materials/MaterialForm";
import MaterialList from "../materials/MaterialList";

import EmployeeDetail from "../employees/EmployeeDetail";
import EmployeeList from "../employees/EmployeeList";
import EmployeeUnactive from "../employees/EmployeeUnactive";

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

        <PrivateRoute exact path="/projects/new">
          <ProjectForm />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId">
          <ProjectDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/employee/personnel">
          <EmployeeList />
        </PrivateRoute>

        <Route exact path="/employee/pending">
          <EmployeeUnactive />
        </Route>

        <PrivateRoute exact path="/employee/:empId">
          <EmployeeDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId/input">
          <ProjectInput />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId/reports">
          <ProjectReports />
        </PrivateRoute>

        <PrivateRoute exact path="/employee/personnel/new">
          <SignupForm signup={signup} />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId/chamber/new">
          <ChamberForm />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId/chamber/:chamberId">
          <ChamberDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:projId/chamber/:chamberId/reading">
          <ChamberReading />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/projects/:projId/chamber/:chamberId/dehu/new"
        >
          <DehuForm />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/projects/:projId/chamber/:chamberId/dehu/list"
        >
          <DehuList />
        </PrivateRoute>

        <PrivateRoute
          exaact
          path="/projects/:projId/chamber/:chamberId/dehu/:dehuId/reading"
        >
          <DehuReading />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/projects/:projId/chamber/:chamberId/material/list"
        >
          <MaterialList />
        </PrivateRoute>

        <PrivateRoute
          exaact
          path="/projects/:projId/chamber/:chamberId/material/:materialId/reading"
        >
          <MaterialReading />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/projects/:projId/chamber/:chamberId/material/new"
        >
          <MaterialForm />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default Routes;
