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

function MaterialCardList({ materials, projId }) {
  return (
    <div>
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          id={material.id}
          chamberId={material.chamberId}
          materialName={material.materialName}
          projectId={projId}
        />
      ))}
    </div>
  );
}

export default MaterialCardList;
