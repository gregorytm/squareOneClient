import React from "react";
import { Link } from "react-router-dom";

/** Show limited information about a job
 *
 * Is rendderd by ChamberCardList to show a "card" for each job
 *
 * ChamberCardList -> ChamberCard
 *
 */

function ChamberCard({ id, chamberName, projectId }) {
  return (
    <Link to={`/chamber/${id}`}>
      <div>
        <h6>
          {chamberName}
          {projectId}
        </h6>
      </div>
    </Link>
  );
}

export default ChamberCard;
