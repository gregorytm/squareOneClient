import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaterialData from "./MaterialData";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** Dehu reading form
 *
 *
 * SHows form and manages update to state on changes
 * On submission:
 * -calls new dehu reading function prop
 * -redireects to /projects/:projId/chamber/:chamberId
 *
 * Routes => DehuForm -> Alert
 * Routed as /projects/:id /chamber/:chamberId/dehu/reading
 */

function MaterialReading() {
  const { projId, chamberId, materialId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    chamberId: null,
    dehuId: null,
    materialId: materialId,
    temp: null,
    RH: null,
    moistureContent: "",
    dayNumber: "",
    readingDate: new Date().toJSON(),
  });
  const [formErrors, setFormErrors] = useState([]);

  /** handle form submit:
   *
   * calls login func prop if success reddirect to /projects/:projId/chamber/:chamberId
   *
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
    console.log("test", formSafe);
    let result = await SquareOneApi.newMaterialReading(formSafe);
    if (result) {
      history.push(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div className="ChamberForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Reading</h2>
        <MaterialData materialId={materialId} />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Moisture Content</label>
                <input
                  name="moistureContent"
                  className="form-control"
                  value={formData.moistureContent}
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

export default MaterialReading;
