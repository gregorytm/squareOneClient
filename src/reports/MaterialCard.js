import React from "react";
import { Link } from "react-router-dom";

/**Show limiteed information about affected materials and readings related to project
 *
 * is renderd by Reports MaterialCardList to show a "cared" for each reading
 *
 * Reports Folder!
 * MaterialList -> MaterialCardLIst -> MaterialCard
 */

function MaterialCard({
  id,
  projId,
  chamberName,
  materialName,
  moistureContent,
  readingDate,
  dayNumber,
}) {
  return (
    <Link className="card" to={`/projects/${projId}/reading/material/${id}`}>
      <div className=" card">
        <div className="text-center">
          <p className="card-title">
            {chamberName}, {materialName}, {moistureContent},{" "}
            {new Date(readingDate).toDateString()}, {dayNumber}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MaterialCard;
