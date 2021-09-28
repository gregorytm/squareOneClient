import React from "react";
import { Link } from "react-router-dom";

/**Show limited information about a company
 *
 * Is renderd by ProjectList to show a "card" for each comapny
 *
 * CompanyList -> CompanyCard
 */

function ProjectCard({ id, address, insuredName, created_at, active }) {
  return (
    <Link className="ProjectCard card" to={`/companies/${id}`}>
      <div className="card-body">
        <h6 className="card-title">
          {address}
          {insuredName}
        </h6>
        <p>
          <small>
            {created_at} {active}
          </small>
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
