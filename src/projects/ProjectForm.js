import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** New project form
 *
 * Shows form and manages update to stae on changes.
 * On submission:
 * - calls new project function prop
 * - redirects to /projects/:projId
 *
 * Routes -> ProjectForm -> Alert
 * Routed as /projects/new
 */

function ProjectForm() {
  const [formData, setFormData] = useState({
    insuredName: "",
    address: "",
    createdAt: new Date(),
  });
  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  async function newProjectApiCall(data) {
    try {
      let result = await SquareOneApi.newProject(data);
      return { susccess: true, result };
    } catch (errors) {
      console.error("create new project failed", errors);
      return { succes: false, errors };
    }
  }

  /** Handles form submit:
   *
   * calls login func prop and, if success redirec to /projects/:id
   */

  async function handleSubmit(evt) {
    const {
      insuredName: insured_name,
      address,
      createdAt: created_at,
    } = formData;
    const formSafe = { insured_name, address, created_at };

    evt.preventDefault();
    let project = await newProjectApiCall(formSafe);
    if (project) {
      navigate(`/projects/${project.result.id}`);
    } else {
      setFormErrors(project.result.errors);
    }
  }

  /** update formdata field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="ProjectForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Project</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Insured Name</label>
                <input
                  name="insuredName"
                  required="required"
                  className="form-control"
                  value={formData.insuredName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="address"
                  required="required"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right mt-4"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
