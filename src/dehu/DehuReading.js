import React from "react";
import { useCurrentUser } from "../auth/UserContext";
import LoggedInManagement from "./LoggedInManagement";
import LoggedInUser from "./LoggedInUser";

/** Dehu reading form buttons
 *
 * Shows form and manages update to state on changes
 * On submission:
 * - calls new dehu reading function prop
 * - delete dehu button available
 * - redirects to /projects/:projId/chamber/:chamberid
 *
 * Routes => DehuForm -> Alert
 * Routed as /projects/:id/chamber/:chamberId/dehu/reading
 */

function DehuReading() {
  const currentUser = useCurrentUser();

  return (
    <div>
      {currentUser.role === "admin" ? (
        <LoggedInManagement />
      ) : currentUser.role === "manager" ? (
        <LoggedInManagement />
      ) : (
        <LoggedInUser />
      )}
    </div>
  );
}

export default DehuReading;
