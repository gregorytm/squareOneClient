import React, { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";
import DehuData from "./DehuData";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** Dehu reading form and buttons
 *
 * Shows form and manages update to state on changes
 * On submission:
 * - calls new dehu reading function prop
 * - redirects to /projects/:projId/chamber/:chamberid
 *
 * Routes => DehuForm -> Alert
 * Routed as /projects/:id/chamber/:chamberId/dehu/reading
 */

function UserReading() {
  const { projId, chamberId, dehuId } = useParams();
  const currentUser = useCurrentUser();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    chamberId: null,
    dehuId: dehuId,
    materialId: null,
    tempature: "",
    RH: "",
    moistureContent: null,
    dayNumber: "",
    readingDate: new Date().toJSON(),
  });
  const [formErrors, setFormErrors] = useState([]);

  async function newDehuReadingApiCall(data) {
    try {
      let result = await SquareOneApi.newDehuReading(data);
      return { success: true, result };
    } catch (errors) {
      console.error("failed to take new reading", errors);
      return { success: false, errors };
    }
  }

  /**handle form submit:
   *
   * calls login func prop, if successfull redirects to ...
   */

  async function handleSubmit(evt) {
    const formSafe = {
      chamberId: formData.chamberId,
      dehuId: formData.dehuId,
      materialId: formData.materialId,
      temp: Number(formData.tempature),
      RH: Number(formData.RH),
      moistureContent: formData.moistureContent,
      dayNumber: Number(formData.dayNumber),
      readingDate: formData.readingDate,
    };

    evt.preventDefault();
    let reading = await newDehuReadingApiCall(formSafe);
    if (reading.success) {
      navigate(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      setFormErrors(reading.errors);
    }
  }

  /**update formDatafield */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteDehu(dehuId);
    if (result.deleted) {
      navigate(`/projects/${projId}/input`);
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="mb-3">New Reading</h2>
      <div className="card">
        <div className="card-body">
          <DehuData dehuId={dehuId} />

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>tempature</label>
                <input
                  name="tempature"
                  request="required"
                  className="form-control"
                  value={formData.tempature}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Relative Humidity</label>
                <input
                  name="RH"
                  required="required"
                  className="form-control"
                  value={formData.RH}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Day Number</label>
                <input
                  name="dayNumber"
                  required="required"
                  className="form-control"
                  value={formData.dayNumber}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary btn-block mt-4"
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

export default UserReading;
