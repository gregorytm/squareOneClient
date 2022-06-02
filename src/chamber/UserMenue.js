import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import SquareOneApi from "../api/api";

/**Chamber Detail Page
 *
 * Renders information about chamber for users,
 * any dehus listed in chamber listed
 *
 * optional view: affected materials
 *
 */

function UserMenue() {
  const { projId, chamberId } = useParams();
  let navigate = useNavigate();

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

  function handleBack() {
    navigate(`/projects/${projId}/input`);
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 text-center">
      <h4>{chamber.chamberName}</h4>
      <NavLink
        className="btn btn-primary btn-block mt-4"
        to={`/projects/${projId}/chamber/${chamberId}/dehu/list`}
      >
        Dehumidifier List
      </NavLink>
      <NavLink
        className="btn btn-success btn-block mt-4"
        to={`/projects/${projId}/chamber/${chamberId}/material/list`}
      >
        Affected Materials
      </NavLink>
      <NavLink
        className="btn btn-warning btn-block mt-4"
        to={`/projects/${projId}/chamber/${chamberId}/reading`}
      >
        Chamber Reading
      </NavLink>
      <button className="btn btn-secondary btn-block mt-4" onClick={handleBack}>
        Back to chamber list
      </button>
    </div>
  );
}

export default UserMenue;
