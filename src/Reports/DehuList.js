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

function DehuList() {
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
    <div className="">
      {readings.length ? (
        <DehuCardList readings={readings} />
      ) : (
        <p className="">No readings were found</p>
      )}
    </div>
  );
}

export default DehuList;
