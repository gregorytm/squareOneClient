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

  useEffect(
    function getMaterialsOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let materials = await SquareOneApi.getMaterials(chamberId);
    setMaterials(materials);
  }

  if (!materials) return <LoadingSpinner />;

  return (
    <div className="">
      {materials.length ? (
        <MaterialCardList materials={materials} projId={projId} />
      ) : (
        <p className="">No materials found</p>
      )}
      <NavLink
        className=""
        to={`/projects/${projId}/chamber/${chamberId}/material/new`}
      >
        <p>New Affected Material</p>
      </NavLink>
    </div>
  );
}

export default MaterialList;
