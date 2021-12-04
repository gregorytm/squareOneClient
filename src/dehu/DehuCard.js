import React from "react";
import { Link } from "react-router-dom";

/**Show info about a dehu
 *
 * Is renderd by ChamberList to show a "card" for each dehu
 *
 * ChamberList -> ChamberCard
 */

function DehuCard({ id, dehuNumber, chamberId, location }) {
  return (
    <Link className="" to={`/dehu/${id}`}>
      <div className="">
        <h6 className="">
          {dehuNumber}
          {chamberId}
          {location}
        </h6>
      </div>
    </Link>
  );
}

export default DehuCard;
