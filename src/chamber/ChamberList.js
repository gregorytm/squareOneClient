import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import ChamberCardList from "./ChamberCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";

/** Show page with list of chambers
 *
 * On mount, loads chambers from API
 * Re-loads filtered chambers on submit from search form.
 *
 * ChamberList -> ChamberCardList -> ChamberCard
 *
 * This is routed at /projects/:projId/chamber/:chamberId
 */

function ChamberList({ projId }) {
  const [chambers, setChambers] = useState(null);

  useEffect(
    function getAllChambersOnMount() {
      search(projId);
    },
    [projId]
  );

  async function search(projId) {
    let chambers = await SquareOneApi.getChambers(projId);
    setChambers(chambers);
  }

  if (!chambers) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="text-center">
        {chambers.length ? (
          <ChamberCardList chambers={chambers} />
        ) : (
          <strong className="">No chambers found</strong>
        )}
      </div>

      <NavLink
        className="btn btn-primary col-md-6 col-lg-4 offset-md-3 offset-lg-4"
        to={`/projects/${projId}/chamber/new`}
      >
        New Chamber
      </NavLink>
    </div>
  );
}

export default ChamberList;
