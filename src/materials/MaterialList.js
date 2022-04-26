import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import MaterialCardList from "./MaterialCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";

/**Show page with list of affected materials
 *
 * On mount, loads materials from API
 *
 * AffectedList -> AffectedCardList -> DehuCard
 *
 * This is routed to /project/:id/chamber/:id
 *
 * ROuter -> { AffectedCard}
 */

function MaterialList() {
  const { projId, chamberId } = useParams();
  const [materials, setMaterials] = useState(null);
  const [chamber, setChamber] = useState(null);

  useEffect(
    function getMaterialsOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let materials = await SquareOneApi.getMaterials(chamberId);
    let chamber = await SquareOneApi.getChamber(chamberId);
    setMaterials(materials);
    setChamber(chamber);
  }

  if (!materials && !chamber) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="col-md-8 offset-md-2 text-center">
        {chamber ? <h4>{chamber.chamberName}</h4> : <p>waiting...</p>}
        {materials.length ? (
          <MaterialCardList materials={materials} projId={projId} />
        ) : (
          <p className="">No materials found</p>
        )}
        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/projects/${projId}/chamber/${chamberId}/material/new`}
        >
          New Affected Material
        </NavLink>
      </div>
    </div>
  );
}

export default MaterialList;
