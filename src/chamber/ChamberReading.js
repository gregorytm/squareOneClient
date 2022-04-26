import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();
  const { projId, chamberId } = useParams();
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

  async function newChamberReadingApiCall(data) {
    try {
      let result = await SquareOneApi.newChamberReading(data);
      return { success: true, result };
    } catch (errors) {
      console.error("failed to create new chamber reading", errors);
      return { success: false, errors };
    }
  }

  /** handle form submit:
   *
   * calls login func prop and if successfull redirecs to /projects/:projId/chamber/:chamberId
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
      chamber_id: Number(chamber_id),
      dehu_id,
      material_id,
      temp: Number(temp),
      RH: Number(RH),
      moisture_content,
      day_number: Number(day_number),
      reading_date,
    };

    evt.preventDefault();
    let reading = await newChamberReadingApiCall(formSafe);
    if (reading.success) {
      navigate(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      console.log("handle submit test", reading);
      setFormErrors(reading.errors);
    }
  }

  /** update formData field  */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <ChamberData chamberId={chamberId} />

            <div className="form-group">
              <label>tempature</label>
              <input
                name="temp"
                required="required"
                className="form-control"
                value={formData.temp}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>relative humidity</label>
              <input
                name="RH"
                required="required"
                className="form-control"
                value={formData.RH}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>day number</label>
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
              className="btn btn-primary float-right mt-4"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChamberReading;
