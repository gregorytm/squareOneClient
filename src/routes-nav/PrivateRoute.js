import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Higher-Order componet for private routes.
 *
 *
 * In routing component, use these instead of <Route ...>  THis component
 * will check if there is a valid current user and oly continues to the route if so.
 * if no use is presentl, redirect to the login form
 */
