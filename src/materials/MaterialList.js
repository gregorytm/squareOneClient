import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import MaterialCardList from "./MaterialCardList";
import LoadingSpinner from "../common/LoadingSpinner";

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

function MaterialList({ chamberId }) {
  const [materials, setMaterials] = useState(null);

  useEffect(
    function getMaterialsOnMount() {
      search(chamberId);
    },
    [chamberId]
  );

  async function search(chamberId) {
    let materials = await SquareOneApi.getMaterials(chamberId);
    console.log("client materials", materials);
    setMaterials(materials);
  }

  if (!materials) return <LoadingSpinner />;

  return (
    <div className="">
      {materials.length ? (
        <MaterialCardList materials={materials} />
      ) : (
        <p className="">No material materials found</p>
      )}
    </div>
  );
}

export default MaterialList;
