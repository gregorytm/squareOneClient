import React from "react";
import { Link } from "react-router-dom";

import "./DehuCard.css";

/**Show info about a dehu
 *
 * Is renderd by ChamberList to show a "card" for each dehu
 *
 * ChamberList -> ChamberCard
 */

function DehuCard({ id, dehuNumber, chamberId, location, projectId }) {
  return (
    <Link
      className="DehuCard card"
      to={`/projects/${projectId}/chamber/${chamberId}/dehu/${id}/reading`}
    >
      <div className="card-body">
        <h6 className="card-title">
          Dehu Number: {""}
          {dehuNumber} {""}
          {"-"} {location}
        </h6>
      </div>
    </Link>
  );
}

export default DehuCard;
