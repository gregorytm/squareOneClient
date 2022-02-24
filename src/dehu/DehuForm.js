import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** New dehu form
 *
 * Shows form and manages update to state on chanages.
 * On submission:
 * - calls new dehu function prop
 *  - redirects to /projects/:projId/chamber/:chamberId
 *
 * Routers => DehuForm -> Alert
 * Routed as /projects/:id/chamber/:chamberId/dehu/new
 */

function DehuForm({ dehu }) {
  const history = useHistory();
  const { projId, chamberId } = useParams();
  const [formData, setFormData] = useState({
    dehuNumber: "",
    chamberId: chamberId,
    location: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  /** handles form submit:
   *
   * calls login func prop, if success redirect to /projects/:projId
   */

  async function handleSubmit(evt) {
    const {
      dehuNumber: dehu_number,
      chamberId: chamber_id,
      location,
    } = formData;
    const formSafe = { dehu_number, chamber_id, location };

    evt.preventDefault();
    let result = await SquareOneApi.newDehu(formSafe);
    if (result) {
      history.push(
        `/projects/${projId}/chamber/${chamberId}/dehu/${result.id}/reading`
      );
    } else {
      setFormErrors(result.errors);
    }
  }

  /** update formData field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div className="ChamberForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Dehumidifier</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Dehumidifier number</label>
                <input
                  name="dehuNumber"
                  className="form-control"
                  value={formData.dehuNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>location</label>
                <input
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right"
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

export default DehuForm;
