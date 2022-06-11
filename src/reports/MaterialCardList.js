import React from "react";
import MaterialCard from "./MaterialCard";

/**SHOWS list of materials readings related to rpoject
 *
 * used by DehuListPage
 *
 * MaterialkList -> MaterialCardList -> MaterialCard
 */

function MaterialCardList({ readings }) {
  return (
    <div>
      <h4 className="text-center">Affected Material Reports</h4>
      {readings.map((reading) => (
        <MaterialCard
          key={readings.indexOf(reading)}
          id={readings.indexOf(reading)}
          chamberName={reading.chamberName}
          materialName={reading.materialName}
          moistureContent={reading.moistureContent}
          readingDate={reading.readingDate}
          dayNumber={reading.dayNumber}
        />
      ))}
    </div>
  );
}

export default MaterialCardList;
