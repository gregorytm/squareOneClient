import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import ChamberCardList from "./ChamberCardList";

/** Project Report page for chamber
 *
 * Renders information and readings about project.
 *
 *
 */

function ChamberReportList() {
  const { projId } = useParams();
  const [readings, setReadings] = useState(null);

  useEffect(
    function getAllChamberDataOnMount() {
      search(projId);
    },
    [projId]
  );

  async function search(projId) {
    let chamberReadings = await SquareOneApi.chamberReports(projId);
    setReadings(chamberReadings);
  }

  if (!readings) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="text-center">
        {readings.length ? (
          <ChamberCardList readings={readings} projId={projId} />
        ) : (
          <strong className="">No readings found</strong>
        )}
      </div>
    </div>
  );
}

export default ChamberReportList;
