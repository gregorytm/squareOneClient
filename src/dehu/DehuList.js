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
  const [chamber, setChamber] = useState(null);

  useEffect(
    function getDehusChamberOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let dehus = await SquareOneApi.getDehus(chamberId);
    let chamber = await SquareOneApi.getChamber(chamberId);
    setDehus(dehus);
    setChamber(chamber);
  }

  if (!dehus && !chamber) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="col-md-8 offset-md-2 text-center">
        {chamber ? <h4>{chamber.chamberName}</h4> : <p>waiting...</p>}
        {dehus.length ? (
          <DehuCardList dehus={dehus} projId={projId} />
        ) : (
          <p className="">No dehus were found</p>
        )}
        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/projects/${projId}/chamber/${chamberId}/dehu/new`}
        >
          New Dehumidifier
        </NavLink>
      </div>
    </div>
  );
}
export default DehuList;
