import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import EmployeeCardList from "./EmployeeCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";

/**SHow page with list of employees
 *
 * On mount, loads employees from API
 *
 * EmployeeList -> EmployeeCardList -> EmployeeCard
 *
 * This is routed to /employees
 *
 * Router -> { DehuCard }
 */

function EmployeeList() {
  const [employees, setEmployees] = useState(null);

  useEffect(function getEmployeesOnMount() {
    search();
  }, []);

  async function search() {
    let employeeList = await SquareOneApi.getEmployees();
    setEmployees(employeeList);
  }

  if (!employees) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="col-md-8 offset-md-2 text-center">
        {employees.length ? (
          <EmployeeCardList employees={employees} />
        ) : (
          <p className="">No employees were found</p>
        )}

        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/employee/personnel/new`}
        >
          New Employee
        </NavLink>
      </div>
    </div>
  );
}
export default EmployeeList;
