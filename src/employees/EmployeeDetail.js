import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  let navigate = useNavigate();

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
      navigate(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handlePromoteToManager(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.promoteToManager(empId);
    if (result) {
      navigate(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handleUnactive(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.unactiveEmployee(empId);
    if (result) {
      navigate(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handlePromoteToUser(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.promoteToUser(empId);
    if (result.employee) {
      navigate(`/employee/personnel`);
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleBack() {
    navigate(`/employee/personnel`);
  }

  if (!employee) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h4 className="">
        first inital {employee.firstInital} last name {employee.lastName}
      </h4>
      <h5>role: {employee.role ? employee.role : "unactive"}</h5>
      <button
        className="btn btn-success btn-block mt-4"
        type="submit"
        onClick={handlePromoteToUser}
      >
        Activate User
      </button>{" "}
      <button
        className="btn btn-primary btn-block mt-4"
        type="submit"
        onClick={handlePromoteToManager}
      >
        Promote to Manager
      </button>{" "}
      <button
        className="btn btn-dark btn-block mt-4"
        type="submit"
        onClick={handleUnactive}
      >
        Make Unactive
      </button>{" "}
      <button
        className="btn btn-danger btn-block mt-4"
        type="submit"
        onClick={handleDelete}
      >
        Delete Employee
      </button>{" "}
      <button
        className="btn btn-secondary btn-block mt-4"
        type="submit"
        onClick={handleBack}
      >
        Go Back
      </button>
      {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
    </div>
  );
}

export default EmployeeDetail;
