import React from "react";
import ChamberCard from "./ChamberCard";
/** Show list of chamber cards a project has
 *
 * used by Project details page.
 *
 * ChambeList -> ChamberCardList -> ChamberCard
 * ProjectDetail -> ChamberCardList - ChamberCard
 */

function ChamberCardList({ chambers }) {
  return (
    <div>
      {chambers.map((chamber) => (
        <ChamberCard
          key={chamber.id}
          id={chamber.id}
          chamberName={chamber.chamberName}
          projectId={chamber.projectId}
        />
      ))}
    </div>
  );
}

export default ChamberCardList;
