import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DehuReadingData from "./DehuReadingData";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** Dehu reading form
 *
 * Shows form and manages update to state on changes
 * On submission:
 * - calls new dehu reading function prop
 * - redirects to /projects/:projId/chamber/:chamberid
 *
 * Routes => DehuForm -> Alert
 * Routed as /projects/:id/chamber/:chamberId/dehu/reading
 */

function DehuReading({ reading }) {
  const { projId, chamberId, dehuId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    chamberId: null,
    dehuId: dehuId,
    materialId: null,
    temp: "",
    RH: "",
    moistureContent: null,
    dayNumber: "",
    readingDate: new Date().toJSON(),
  });
  const [formErrors, setFormErrors] = useState([]);

  /** handle form submit:
   *
   * calls login func prop if success redirect to /projects/:projId/chamber/:chamberId
   */

  async function handleSubmit(evt) {
    const {
      chamberId: chamber_id,
      dehuId: dehu_id,
      materialId: material_id,
      temp,
      RH,
      moistureContent: moisture_content,
      dayNumber: day_number,
      readingDate: reading_date,
    } = formData;
    const formSafe = {
      chamber_id,
      dehu_id,
      material_id,
      temp,
      RH,
      moisture_content,
      day_number,
      reading_date,
    };

    evt.preventDefault();
    let result = await SquareOneApi.newDehuReading(formSafe);
    if (result) {
      history.push(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** update form Data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div className="ChamberForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Reading</h2>
        <DehuReadingData dehuId={dehuId} />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>temp</label>
                <input
                  name="temp"
                  className="form-control"
                  value={formData.temp}
                  onChange={handleChange}
                />
                <label>RH</label>
                <input
                  name="RH"
                  className="form-control"
                  value={formData.RH}
                  onChange={handleChange}
                />
                <label>day number</label>
                <input
                  name="dayNumber"
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

export default DehuReading;
