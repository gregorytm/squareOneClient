import React from "react";
import { Link } from "react-router-dom";

import "./ChamberCard.css";

/** Show limited information about a job
 *
 * Is renderd by ChamberCardList to show a "card" for each job
 *
 * ChamberCardList -> ChamberCard
 *
 */

function ChamberCard({ projectId, chamberName, id }) {
  return (
    <Link
      className="ChamberCard card"
      to={`/projects/${projectId}/chamber/${id}`}
    >
      <div className="card-body">
        <div className="card-title">
          <h6>{chamberName}</h6>
        </div>
      </div>
    </Link>
  );
}

export default ChamberCard;
