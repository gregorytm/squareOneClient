import React from "react";
import { useCurrentUser } from "../auth/UserContext";
import ManagementReading from "./ManagementReading";
import UserReading from "./UserReading";

/** Dehu reading form
 *
 *
 * SHows form and manages update to state on changes
 * On submission:
 * -calls new dehu reading function prop
 * -redireects to /projects/:projId/chamber/:chamberId
 *
 * Routes => DehuForm -> Alert
 * Routed as /projects/:id /chamber/:chamberId/dehu/reading
 */

function MaterialReading() {
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

export default MaterialReading;
