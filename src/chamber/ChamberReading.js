import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChamberData from "./ChamberData";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/** new reading form for Chamber atmospheric readings
 *
 * shows form and manages update to state on changes.
 * ON submission:
 * -calls new reading function prop
 * -redirects to /projects/active
 *
 * Chamber readings require
 * -chamber
 * - temp
 * - RH
 *
 * Chamber Routes => ChamberReading -> Alert
 * Routed as projects/:id/chamber/:id/reading/new
 *
 * Dehu Routes => DehuReading -> Alert
 * Routed as projects/:id/chamber/:id/dehu/reading/new
 */

function ChamberReading() {
  const { chamberId } = useParams();
  const [formData, setFormData] = useState({
    chamberId: chamberId,
    dehuId: null,
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
   * calls login func prop and if successfull redirecs to /projects/:projId/chamber/:chamberId
   */

  async function handleSubmit(evt) {
    const {
      chamberId: chamber_id,
      dehuId: dehu_id,
      material_id,
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
    let result = await SquareOneApi.newChamberReading(formSafe);
    if (result) {
      window.location.reload();
    } else {
      setFormErrors(result.errors);
    }
  }

  /** update formData field  */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="ChamberForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">New Reading</h2>
        <ChamberData chamberId={chamberId} />
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

export default ChamberReading;
