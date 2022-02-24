import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import DehuCardList from "./DehuCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";

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

function DehuList() {
  const { projId, chamberId } = useParams();
  const [dehus, setDehus] = useState(null);

  useEffect(
    function getDehusOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let dehus = await SquareOneApi.getDehus(chamberId);
    setDehus(dehus);
  }

  if (!dehus) return <LoadingSpinner />;

  return (
    <div className="">
      {dehus.length ? (
        <DehuCardList dehus={dehus} projId={projId} />
      ) : (
        <p className="">No dehus were found</p>
      )}
      <NavLink
        className=""
        to={`/projects/${projId}/chamber/${chamberId}/dehu/new`}
      >
        <p>New Dehumidifier</p>
      </NavLink>
    </div>
  );
}
export default DehuList;
