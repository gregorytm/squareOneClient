import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import ChamberDataCard from "./ChamberDataCard";
import LoadingSpinner from "../common/LoadingSpinner";

/**Finds the last reading take for given chamber
 *
 * On mount, loads chamber reading data from API
 *
 * ChamberData -> ChamberDataCard
 *
 * used by ChamberReading
 */

function ChamberData({ chamberId }) {
  const [data, setData] = useState(null);

  useEffect(
    function getDataOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let data = await SquareOneApi.chamberReadingData(chamberId);
    setData(data);
  }

  if (!data) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <div className="text-center">
        {data ? (
          <ChamberDataCard data={data} />
        ) : (
          <strong className="">No previous entries found for chamber</strong>
        )}
      </div>
    </div>
  );
}

export default ChamberData;
