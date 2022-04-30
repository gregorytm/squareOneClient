import React from "react";

/** shows info about last chamber reading
 * is rendered by MaterialData
 *
 * MaterialData -> MaterialCard
 */

function MaterialDataCard(data) {
  const { readingDate, dayNumber } = data.data;
  return (
    <div className="">
      <p>
        the last reading was take on {new Date(readingDate).toDateString()}, day
        number {dayNumber}
      </p>
    </div>
  );
}

export default MaterialDataCard;
