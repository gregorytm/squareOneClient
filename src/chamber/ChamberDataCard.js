import React from "react";

/**Shoows info about last chamber reading
 * is rendered by ChamberData
 *
 * ChamberData-ChamberCard
 */

function ChamberDataCard(data) {
  const { reading_date: readingDate, day_number: dayNumber } = data.data;
  return (
    <div className="">
      <p>
        the last reading was taken on {new Date(readingDate).toDateString()},
        day number {dayNumber}
      </p>
    </div>
  );
}

export default ChamberDataCard;
