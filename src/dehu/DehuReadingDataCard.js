import React from "react";

/** Shows info about last dehu reading
 *
 * is renderd by DehuReading
 *
 * DehuReadingData = DehuReadingDataCard
 */

function DehuReadingDataCard(data) {
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

export default DehuReadingDataCard;
