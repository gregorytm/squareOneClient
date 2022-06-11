import React from "react";

import "./DehuCard.css";

/**SHow limited information about a job
 *
 * Is renderd by Reports DehuCardList to show a "card" for each reading
 *
 * Reports folder
 * DehuList -> DehuCardList ->DehuCard
 */

function DehuCard({ dehuNumber, location, temp, rh, readingDate, dayNumber }) {
  return (
    <div className="container">
      <div className="DehuCard card">
        <div className="text-center">
          <p className="card-title">
            dehu number {dehuNumber}, {location}, {temp}, {rh},{" "}
            {new Date(readingDate).toDateString()}, {dayNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DehuCard;
