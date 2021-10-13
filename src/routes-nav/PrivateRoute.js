import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Higher-Order componet for private routes.
 *
 *
 * In routing component, use these instead of <Route ...>  THis component
 * will check if there is a valid current user and oly continues to the route if so.
 * if no use is present, redirect to the login form
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
