import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import MaterialCardList from "./MaterialCardList";

/**Project report page for materials
 *
 * Renders information and readings about affected materials linked to project
 *
 *
 */

function MaterialReportList() {
  const { projId } = useParams();
  const [readings, setReadings] = useState(null);

  useEffect(
    function getAllMaterialsOnMount() {
      search(projId);
    },
    [projId]
  );

  async function search(projId) {
    let materialReadings = await SquareOneApi.materialReports(projId);
    setReadings(materialReadings);
  }

  if (!readings) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="text-center">
        {readings.length ? (
          <MaterialCardList readings={readings} />
        ) : (
          <strong className="">No readings found</strong>
        )}
      </div>
    </div>
  );
}

export default MaterialReportList;
