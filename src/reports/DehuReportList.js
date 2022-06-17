import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import DehuCardList from "./DehuCardList";

/**Project Report page for dehus
 *
 * Renders information and readings about dehu readings linked to project
 *
 *
 */

function DehuReportList() {
  const { projId } = useParams();
  const [readings, setReadings] = useState(null);

  useEffect(
    function getAllDehuDataOnMount() {
      search(projId);
    },
    [projId]
  );

  async function search(projId) {
    let dehuReadings = await SquareOneApi.dehuReports(projId);
    setReadings(dehuReadings);
  }

  if (!readings) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="text-center">
        {readings.length ? (
          <DehuCardList readings={readings} projId={projId} />
        ) : (
          <strong className="">No readings were found</strong>
        )}
      </div>
    </div>
  );
}

export default DehuReportList;
