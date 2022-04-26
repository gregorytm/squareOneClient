import React from "react";
import DehuCard from "./DehuCard";

/**Shows list of dehu readings related to project
 *
 * used by DehuList page
 *
 * DehuList -> DehuCardList -> DehuCard
 */

function DehuCardList({ readings }) {
  return (
    <div>
      <h4 className="text-center">Dehumidifier Readings</h4>
      {readings.map((reading) => (
        <DehuCard
          key={readings.indexOf(reading)}
          id={readings.indexOf(reading)}
          dehuNumber={reading.dehuNumber}
          location={reading.location}
          temp={reading.temp}
          rh={reading.rh}
          readingDate={reading.readingDate}
          dayNumber={reading.dayNumber}
        />
      ))}
    </div>
  );
}

export default DehuCardList;
