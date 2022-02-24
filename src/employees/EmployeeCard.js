import React from "react";
import { Link } from "react-router-dom";

/** Show information on an employee
 *
 * is renderd by EmployeeCardList to show "a card for each employee"
 *
 * EmployeList => EmployeCardList -> EmployeeCard
 */

function EmployeeCard({ id: empId, firstInital, lastName, role }) {
  return (
    <div>
      <Link to={`/employee/${empId}`}>
        <div>
          <h6>
            <small>
              first inital {firstInital} last name {lastName} role {role}
            </small>
          </h6>
        </div>
      </Link>
    </div>
  );
}

export default EmployeeCard;
