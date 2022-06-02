import React from "react";
import { useCurrentUser } from "../auth/UserContext";
import ManagementReading from "./ManagementReading";
import UserReading from "./UserReading";

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
        <ManagementReading />
      ) : currentUser.role === "manager" ? (
        <ManagementReading />
      ) : (
        <UserReading />
      )}
    </div>
  );
}

export default DehuReading;
