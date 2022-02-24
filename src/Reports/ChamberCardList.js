import React from "react";
import ChamberCard from "./ChamberCard";
/**Shows list of chamber readings a project has
 *
 * used by ChamberReports page
 *
 * ChamberReport -> ChamberReportCardList -> ChamberReportCard
 */

function ChamberCardList({ readings }) {
  return (
    <div>
      {readings.map((reading) => (
        <ChamberCard
          key={readings.indexOf(reading)}
          id={readings.indexOf(reading)}
          chamberName={reading.chamberName}
          temp={reading.temp}
          rh={reading.rh}
          readingDate={reading.readingDate}
          dayNumber={reading.dayNumber}
        />
      ))}
    </div>
  );
}

export default ChamberCardList;
