import React from "react";
import ChamberCard from "./ChamberCard";
/** Show list of chamber cards a project has
 *
 * used by ProjectList.
 *
 * ChambeList -> ChamberCardList -> ChamberCard
 * ProjectDetail -> ChamberCardList - ChamberCard
 */

function ChamberCardList({ chambers }) {
  console.log("test");
  return (
    <div>
      {chambers.map((chamber) => (
        <ChamberCard
          id={chamber.id}
          chamberName={chamber.chamberName}
          projectId={chamber.projectId}
        />
      ))}
    </div>
  );
}

export default ChamberCardList;
