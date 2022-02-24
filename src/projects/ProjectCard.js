import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.css";

/**Show limited information about a project
 *
 * Is renderd by ProjectList to show a "card" for each comapny
 *
 * ProjectList -> ProjectCard
 */

function ProjectCard({ id, address, insuredName, createdAt, active }) {
  return (
    <Link className="ProjectCard card" to={`/projects/${id}`}>
      <div className="card-body">
        <h6 className="card-title">
          {address}
          {insuredName}
        </h6>
        <p>
          <small>
            {createdAt.getMonth()} {createdAt.getDay()} {createdAt.getYear()}{" "}
            active status: {active}
          </small>
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
