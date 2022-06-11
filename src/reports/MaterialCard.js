import React from "react";

/**Show limiteed information about affected materials and readings related to project
 *
 * is renderd by Reports MaterialCardList to show a "cared" for each reading
 *
 * Reports Folder!
 * MaterialList -> MaterialCardLIst -> MaterialCard
 */

function MaterialCard({
  chamberName,
  materialName,
  moistureContent,
  readingDate,
  dayNumber,
}) {
  return (
    <div className="container">
      <div className="MaterialCard card">
        <div className="text-center">
          <p className="card-title">
            {chamberName}, {materialName}, {moistureContent},{" "}
            {new Date(readingDate).toDateString()}, {dayNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MaterialCard;
