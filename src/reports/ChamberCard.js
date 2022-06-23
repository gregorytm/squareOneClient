import React from "react";
import { Link } from "react-router-dom";

import "./ChamberCard.css";

/** Show limited information about a job
 *
 * Is renderd by REPORTS chamberCardList to show a "card for each reading"
 *
 * REPORTS FOLDER
 * ChamberCardList -> ChamberCard
 *
 */

function ChamberCard({
  id,
  chamberName,
  projId,
  temp,
  rh,
  readingDate,
  dayNumber,
}) {
  return (
    <Link className="card" to={`/projects/${projId}/reading/chamber/${id}`}>
      <div className="text-center">
        <p className="card-title">
          {chamberName}, {temp}, {rh}, {new Date(readingDate).toDateString()},{" "}
          {dayNumber}
        </p>
      </div>
    </Link>
  );
}

export default ChamberCard;
