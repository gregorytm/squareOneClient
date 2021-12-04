import React from "react";
import { Link } from "react-router-dom";

/**Show info about a dehu
 *
 * Is renderd by ChamberList to show a "card" for each peace of affected Material
 *
 * AffectedList -> AffectedCard
 */

function MaterialCard({ id, chamberId, materialName }) {
  console.log("test");
  return (
    <Link to={`/material/${id}`}>
      <div className="">
        <h6>
          {materialName}
          {chamberId}
        </h6>
      </div>
    </Link>
  );
}

export default MaterialCard;
