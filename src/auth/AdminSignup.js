import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";

/**Singup form
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup fnctin prop
 * - redirects to /projects route
 *
 * Routes -> Singup Form -> Alert
 * Routed as /signup
 */

function AdminSignup() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstInital: "",
    lastName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function newEmployeeApiCall(data) {
    try {
      let result = await SquareOneApi.signup(data);
      return { success: true, result };
    } catch (errors) {
      console.error("create new employee failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /projects.
   */

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /projects.
   */

  async function handleSubmit(evt) {
    const {
      username,
      password,
      firstInital: first_inital,
      lastName: last_name,
    } = formData;

    {
      const formSafe = { username, password, first_inital, last_name };

      evt.preventDefault();
      let employee = await newEmployeeApiCall(formSafe);
      if (employee.success) {
        navigate("/employee/personnel");
      } else {
        setFormErrors(employee.errors);
      }
    }
  }

  function handleBack() {
    navigate(`/employee/personnel`);
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  required="required"
                  minLength="3"
                  maxLength="20"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required="required"
                  name="password"
                  minLength="5"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First inital</label>
                <input
                  name="firstInital"
                  required="required"
                  minLength="1"
                  maxLength="1"
                  className="form-control"
                  value={formData.firstInital}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  name="lastName"
                  required="required"
                  minLength="1"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-left mt-4"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary btn-block mt-4"
                onClick={handleBack}
              >
                Back to employee list
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
