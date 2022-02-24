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
    <div className="">
      {employees.length ? (
        <EmployeeCardList employees={employees} />
      ) : (
        <p className="">No employees were found</p>
      )}
      <NavLink className="" to={`/employee/personnel/new`}>
        <p>New Employee</p>
      </NavLink>
    </div>
  );
}
export default EmployeeList;
