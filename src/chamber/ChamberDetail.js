import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";
import SquareOneApi from "../api/api";
import ManagementMenue from "./ManagementMenue";
import UserMenue from "./UserMenue";
import LoadingSpinner from "../common/LoadingSpinner";

/**Chamber Detail Page
 *
 * Renders information about chamber,
 * any dehus listed in chamber listed
 *
 * optional view: affected materials
 *
 */

function ChamberDetail() {
  const { chamberId } = useParams();
  const currentUser = useCurrentUser();

  const [chamber, setChamber] = useState(null);

  useEffect(
    function getChamberForUser() {
      async function getChamber() {
        setChamber(await SquareOneApi.getChamber(chamberId));
      }
      getChamber();
    },
    [chamberId]
  );

  if (!chamber) return <LoadingSpinner />;

  return (
    <div>
      {currentUser.role === "admin" ? (
        <ManagementMenue />
      ) : currentUser.role === "manager" ? (
        <ManagementMenue />
      ) : (
        <UserMenue />
      )}
    </div>
  );
}

export default ChamberDetail;
