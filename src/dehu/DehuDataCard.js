import React from "react";

/** Shows info about last dehu reading
 *
 * is renderd by DehuReading
 *
 * DehuReadingData = DehuReadingDataCard
 */

function DehuDataCard(data) {
  const { readingDate, dayNumber } = data.data;
  console.log("Dehucard teset", data.data);
  return (
    <div className="">
      the last reading was taken on {new Date(readingDate).toDateString()}, day
      number {dayNumber}
    </div>
  );
}

export default DehuDataCard;
