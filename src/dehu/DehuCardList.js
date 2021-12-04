import React from "react";
import DehuCard from "./DehuCard";
/**Show list of dehu cards a chambwer has
 *
 * used by Chamber details page.
 *
 * DehuList -> DehuCardList -> DehuCard
 * ChamberDetial - DehuCardList= DehuCard
 */

function DehuCardList({ dehus }) {
  return (
    <div>
      {dehus.map((dehu) => (
        <DehuCard
          key={dehu.id}
          dehuNumber={dehu.number}
          chamberId={dehu.chamber_id}
          location={dehu.location}
        />
      ))}
    </div>
  );
}

export default DehuCardList;
