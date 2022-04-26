import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** New chmaber form
 *
 * Shows form and manages update to state one changes.
 * On submission:
 * - calls new chamber function prop
 * - redirects to /projects/:projId/chamber/:chamberId
 *
 * Routes => ChamberForm -> Alert
 * Routed as /chamber/new
 */

function ChamberForm() {
  const { projId } = useParams();
  const [formData, setFormData] = useState({
    chamberName: "",
    projectId: projId,
  });
  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  async function newChamberApiCall(data) {
    try {
      let result = await SquareOneApi.newChamber(data);
      return { success: true, result };
    } catch (errors) {
      console.error("create new chamber failed", errors);
      return { success: false, errors };
    }
  }

  /** handles form submit:
   *
   * calls login func prop and, if success redirec to /projects/:projid/chamber/:chamberid
   */

  async function handleSubmit(evt) {
    const { chamberName: chamber_name, projectId: project_id } = formData;
    const formSafe = { chamber_name, project_id: Number(project_id) };

    evt.preventDefault();
    let chamber = await newChamberApiCall(formSafe);
    if (chamber.result) {
      navigate(`/projects/${projId}/chamber/${chamber.result.id}`);
    } else {
      setFormErrors(chamber.errors);
    }
  }

  function handleBack() {
    navigate(`/projects/${projId}`);
  }

  /** update formData field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="ChamberForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Chamber</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Chamber Name</label>
                <input
                  name="chamberName"
                  required="required"
                  className="form-control"
                  value={formData.chamberName}
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

              <button
                className="btn btn-secondary btn-block mt-4"
                onClick={handleBack}
              >
                Back to chamber list
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChamberForm;
