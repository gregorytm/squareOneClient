import React from "react";
import { Link } from "react-router-dom";

import "./MaterialCard.css";

/**Show info about a dehu
 *
 * Is renderd by ChamberList to show a "card" for each peace of affected Material
 *
 * AffectedList -> AffectedCard
 */

function MaterialCard({ id, chamberId, materialName, projectId }) {
  return (
    <Link
      className="MaterialCard card"
      to={`/projects/${projectId}/chamber/${chamberId}/material/${id}/reading`}
    >
      <div className="card-body"></div>
      <div className="card-title">
        <h6>{materialName}</h6>
      </div>
    </Link>
  );
}

export default MaterialCard;
