import React from "react";
import MaterialCard from "./MaterialCard";
/**
 * Show list of dehu cards a chamber has
 *
 * used by Chamber details page
 *
 * AffectedList -> DehuCardList -> DehuCared
 * ChamberDetail - DehuCardList = DehuCard
 */

function MaterialCardList({ materials }) {
  console.log("!!", materials);
  return (
    <div>
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          chamberId={material.chamber_id}
          materialName={material.material_name}
        />
      ))}
    </div>
  );
}

export default MaterialCardList;
