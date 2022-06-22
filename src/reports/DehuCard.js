import React from "react";
import { Link } from "react-router-dom";

import "./DehuCard.css";

/**SHow limited information about a job
 *
 * Is renderd by Reports DehuCardList to show a "card" for each reading
 *
 * Reports folder
 * DehuList -> DehuCardList ->DehuCard
 */

function DehuCard({
  id,
  dehuNumber,
  projId,
  location,
  temp,
  rh,
  readingDate,
  dayNumber,
}) {
  return (
    <Link className="card" to={`/projects/${projId}/reports/dehus/${id}`}>
      <div className="text-center">
        <p className="card-title">
          dehu number {dehuNumber}, {location}, {temp}, {rh},{" "}
          {new Date(readingDate).toDateString()}, {dayNumber}
        </p>
      </div>
    </Link>
  );
}

export default DehuCard;
