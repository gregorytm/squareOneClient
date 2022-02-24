import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import DehuReadingDataCard from "./DehuReadingDataCard";
import LoadingSpinner from "../common/LoadingSpinner";

/**Finds the last reading taken for a given dehu
 *
 * on mount, loads dehu reading data from API
 *
 * DehuReadingData -> DehuReadingDataCard
 */

function DehuReadingData({ dehuId }) {
  const [data, setData] = useState(null);

  useEffect(
    function getDataOnMount() {
      search(dehuId);
    },
    [dehuId]
  );

  async function search(dehuId) {
    let data = await SquareOneApi.dehuReadingData(dehuId);
    data = data.dehuData;
    setData(data);
  }

  if (!data) return <LoadingSpinner />;

  return (
    <div className="">
      {data ? (
        <DehuReadingDataCard data={data} />
      ) : (
        <p className=""> No previous readings found for this dehumidifier</p>
      )}
    </div>
  );
}

export default DehuReadingData;
