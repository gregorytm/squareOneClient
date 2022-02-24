import React from "react";
import DehuCard from "./DehuCard";
/**Show list of dehu cards a chambwer has
 *
 * used by Chamber details page.
 *
 * DehuList -> DehuCardList -> DehuCard
 * ChamberDetial - DehuCardList= DehuCard
 */

function DehuCardList({ dehus, projId }) {
  return (
    <div>
      {dehus.map((dehu) => (
        <DehuCard
          key={dehu.id}
          id={dehu.id}
          dehuNumber={dehu.dehuNumber}
          chamberId={dehu.chamberId}
          location={dehu.location}
          projectId={projId}
        />
      ))}
    </div>
  );
}

export default DehuCardList;
