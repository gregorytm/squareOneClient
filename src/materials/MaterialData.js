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
    data = data.materialData;
    setData(data);
  }

  if (!data) return <LoadingSpinner />;

  return (
    <div className="">
      {data ? (
        <MaterialDataCard data={data} />
      ) : (
        <p className="">No previous entries found for this material</p>
      )}
    </div>
  );
}

export default MaterialData;
