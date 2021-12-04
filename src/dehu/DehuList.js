import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import DehuCardList from "./DehuCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**Show page with list of dehus
 *
 * On mount, loads projects from API
 *
 * DehuList -> DehuCardList -> DehuCard
 *
 * This is routed to /dehus
 *
 * Router -> { DehuCard }
 */

function DehuList({ chamberId }) {
  const [dehus, setDehus] = useState(null);

  useEffect(
    function getDehusOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let dehus = await SquareOneApi.getDehus(chamberId);
    console.log("client dehus", dehus);
    setDehus(dehus);
  }

  if (!dehus) return <LoadingSpinner />;

  return (
    <div className="">
      {dehus.length ? (
        <DehuCardList dehus={dehus} />
      ) : (
        <p className="">No dehus were found</p>
      )}
    </div>
  );
}
export default DehuList;
