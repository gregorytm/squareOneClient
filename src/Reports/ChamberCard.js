import React from "react";

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
    <div>
      <p>
        {chamberName}, {temp}, {rh}, {new Date(readingDate).toDateString()},{" "}
        {dayNumber}
      </p>
    </div>
  );
}

export default ChamberCard;
