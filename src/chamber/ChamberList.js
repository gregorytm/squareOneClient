import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import ChamberCardList from "./ChamberCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of chambers
 *
 * On mount, loads chambers from API
 * Re-loads filtered chambers on submit from search form.
 *
 * ChamberList -> ChamberCardList -> ChamberCard
 *
 * This is routed at /projects/:projId/chamber/:chamberId
 */

function ChamberList({ projectId }) {
  const [chambers, setChambers] = useState(null);

  useEffect(
    function getAllChambersOnMount() {
      search(projectId);
    },
    [projectId]
  );

  async function search(projId) {
    let chambers = await SquareOneApi.getChambers(projId);
    setChambers(chambers);
  }

  if (!chambers) return <LoadingSpinner />;

  return (
    <div className="">
      {chambers.length ? (
        <ChamberCardList chambers={chambers} />
      ) : (
        <p className="">No chambers were found</p>
      )}
    </div>
  );
}

export default ChamberList;
