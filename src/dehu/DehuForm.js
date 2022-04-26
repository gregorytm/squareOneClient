import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function DehuForm() {
  const { projId, chamberId } = useParams();
  const [formData, setFormData] = useState({
    dehuNumber: "",
    chamberId: chamberId,
    location: "",
  });

  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  async function newDehuApiCall(data) {
    try {
      let result = await SquareOneApi.newDehu(data);
      console.log("dehu", { success: true, result });
      return { success: true, result };
    } catch (errors) {
      console.error("create new dehu failed", errors);
      return { success: false, errors };
    }
  }

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
    console.log("dehu data", formData);
    const formSafe = {
      dehu_number: Number(dehu_number),
      chamber_id: Number(chamber_id),
      location,
    };

    evt.preventDefault();
    let dehu = await newDehuApiCall(formSafe);
    console.log("TEST TEST", dehu);
    if (dehu.success) {
      navigate(
        `/projects/${projId}/chamber/${chamberId}/dehu/${dehu.result.id}/reading`
      );
    } else {
      setFormErrors(dehu.errors);
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
                  required="required"
                  className="form-control"
                  value={formData.dehuNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>location</label>
                <input
                  name="location"
                  required="required"
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

export default DehuForm;
