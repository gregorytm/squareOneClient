import React from "react";
import EmployeeCard from "./EmployeeCard";
/**SHows list of all employee cards
 *
 * used by Employees details page
 *
 * EmployeeList -> EmployeeCardList -> EmployeeCard
 *
 */

function EmployeeCardList({ employees }) {
  return (
    <div>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          id={employee.id}
          firstInital={employee.firstInital}
          lastName={employee.lastName}
          role={employee.role}
        />
      ))}
    </div>
  );
}
export default EmployeeCardList;
