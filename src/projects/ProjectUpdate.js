import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/**
 *
 * Displays project form and handles changes to local form state
 * Submitting the form calls the API to save, and triggers project reloading
 * throughout the site
 *
 * Confirmation of a successful save is a simple alert
 */

function ProjectUpdate() {
  let navigate = useNavigate();
  const { projId } = useParams();

  const [formData, setFormData] = useState({
    insuredName: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getProjectForForm() {
      async function getProject() {
        let project = await SquareOneApi.getProject(projId);
        setFormData({
          insuredName: project.insuredName,
          address: project.address,
        });
      }
      getProject();
    },
    [projId]
  );

  async function updateProjectApiCall(data) {
    try {
      let result = await SquareOneApi.updateProject(data);
      return { success: true, result };
    } catch (errors) {
      console.error("update project failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSubmit(evt) {
    const { insuredName: insured_name, address } = formData;
    const newProject = { id: projId, insured_name, address };

    evt.preventDefault();
    let project = await updateProjectApiCall(newProject);
    if (project.success) {
      navigate(`/projects/active`);
    } else {
      setFormErrors(project.errors);
    }
  }

  /** update formData field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
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
              <label>address</label>
              <input
                name="address"
                required="required"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div> */}

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {/* {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null} */}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectUpdate;
