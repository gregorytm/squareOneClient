import React from "react";

/**SHow limited information about a job
 *
 * Is renderd by Reports DehuCardList to show a "card" for each reading
 *
 * Reports folder
 * DehuList -> DehuCardList ->DehuCard
 */

function DehuCard({ dehuNumber, location, temp, rh, readingDate, dayNumber }) {
  return (
    <div>
      <p>
        dehu number {dehuNumber}, {location}, {temp}, {rh},{" "}
        {new Date(readingDate).toDateString()}, {dayNumber}
      </p>
    </div>
  );
}

export default DehuCard;
