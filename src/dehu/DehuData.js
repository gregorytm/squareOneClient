import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import DehuDataCard from "./DehuDataCard";
import "./DehuData.css";

/**Finds the last reading taken for a given dehu
 *
 * on mount, loads dehu reading data from API
 *
 * DehuReadingData -> DehuDataCard
 */

function DehuData({ dehuId }) {
  const [data, setData] = useState(null);

  useEffect(
    function getDataOnMount() {
      search(dehuId);
    },
    [dehuId]
  );

  async function search(dehuId) {
    let data = await SquareOneApi.dehuReadingData(dehuId);
    setData(data);
  }

  return (
    <div className="container-fluid">
      <div className="text-center">
        {data ? (
          <DehuDataCard data={data} />
        ) : (
          <strong className="text-center">
            No previous readings found for dehumidifier
          </strong>
        )}
      </div>
    </div>
  );
}

export default DehuData;
