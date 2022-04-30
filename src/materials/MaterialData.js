import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import MaterialDataCard from "./MaterialDataCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Finds the last readings taken for a given material
 *
 * On mount, loads material reading data from API
 *
 * MaterialData -> MaterialDataCard
 *
 * used by MaterialReading
 */

function MaterialData({ materialId }) {
  const [data, setData] = useState(null);

  useEffect(
    function getDataOnMount() {
      search(materialId);
    },
    [materialId]
  );

  async function search(materialId) {
    let data = await SquareOneApi.materialReadingData(materialId);
    setData(data);
  }

  if (!data) return <LoadingSpinner />;

  return (
    <div className="container-fulid">
      <div className="text-center">
        {data ? (
          <MaterialDataCard data={data} />
        ) : (
          <strong>No previous readings found for selected material</strong>
        )}
      </div>
    </div>
  );
}

export default MaterialData;
