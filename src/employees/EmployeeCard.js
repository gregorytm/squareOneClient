import React from "react";
import { Link } from "react-router-dom";

import "./EmployeeCard.css";

/** Show information on an employee
 *
 * is renderd by EmployeeCardList to show "a card for each employee"
 *
 * EmployeList => EmployeCardList -> EmployeeCard
 */

function EmployeeCard({ id: empId, firstInital, lastName, role }) {
  return (
    <div>
      <Link className="ProjectCard card" to={`/employee/${empId}`}>
        <div>
          <h6 className="text-center">
            first inital: {firstInital} last name: {lastName} role:{" "}
            {role ? role : "unactive"}
          </h6>
        </div>
      </Link>
    </div>
  );
}

export default EmployeeCard;
