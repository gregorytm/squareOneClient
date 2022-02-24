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

function MaterialList() {
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
    <div className="">
      {readings.length ? (
        <MaterialCardList readings={readings} />
      ) : (
        <p className="">No readings were found</p>
      )}
    </div>
  );
}

export default MaterialList;
