import React from "react";

import "./ChamberCard.css";

/** Show limited information about a job
 *
 * Is renderd by REPORTS chamberCardList to show a "card for each reading"
 *
 * REPORTS FOLDER
 * ChamberCardList -> ChamberCard
 *
 */

function ChamberCard({ chamberName, temp, rh, readingDate, dayNumber }) {
  return (
    <div className="container">
      <div className="ChamberCard card">
        <div className="text-center">
          <p className="card-title">
            {chamberName}, {temp}, {rh}, {new Date(readingDate).toDateString()},{" "}
            {dayNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChamberCard;
