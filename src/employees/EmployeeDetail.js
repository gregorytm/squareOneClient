import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

/**Employee Detail Page
 *
 * renders information about an employee
 *
 * can promote employee role from null to employee employee to manager
 *
 */

function EmployeeDetail() {
  const history = useHistory();
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getEmployeeForUser() {
      async function getEmployee() {
        setEmployee(await SquareOneApi.getEmployee(empId));
      }
      getEmployee();
    },
    [empId]
  );

  /**Handles delte
   *
   * if successful redirects to /employee/personnel
   */

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteEmployee(empId);
    if (result.deleted) {
      history.push(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handlePromoteToManager(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.promoteToManager(empId);
    if (result) {
      history.push(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handlePromoteToUser(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.promoteToUser(empId);
    if (result) {
      history.push(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!employee) return <LoadingSpinner />;

  return (
    <div className="">
      <h4>
        first inital{employee.firstInital} last name {employee.lastName}
      </h4>
      role{employee.role}
      <button type="submit" onClick={handleDelete}>
        Delete Employee
      </button>
      <button type="submit" onClick={handlePromoteToManager}>
        Promote to Manager
      </button>
      <button type="submit" onClick={handlePromoteToUser}>
        Activate User
      </button>
      {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
    </div>
  );
}

export default EmployeeDetail;
