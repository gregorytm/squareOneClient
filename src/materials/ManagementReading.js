import React, { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";
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

function ManagementReading() {
  const { projId, chamberId, materialId } = useParams();
  const currentUser = useCurrentUser();
  let navigate = useNavigate();

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
    const formSafe = {
      chamberId: formData.chamberId,
      dehuId: formData.dehuId,
      materialId: Number(formData.materialId),
      temp: formData.temp,
      RH: formData.RH,
      moistureContent: Number(formData.moistureContent),
      dayNumber: Number(formData.dayNumber),
      readingDate: formData.readingDate,
    };

    evt.preventDefault();
    let result = await SquareOneApi.newMaterialReading(formSafe);
    if (result) {
      navigate(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteMaterial(materialId);
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
          <MaterialData materialId={materialId} />

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Moisture Content</label>
                <input
                  name="moistureContent"
                  required="required"
                  className="form-control"
                  value={formData.moistureContent}
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
      <NavLink
        className="btn btn-warning btn-block mt-4"
        to={`/projects/${projId}/chamber/${chamberId}/material/${materialId}/update`}
      >
        Edit affected material
      </NavLink>
      <button
        className="btn btn-danger btn-block mt-4"
        type="submit"
        onClick={handleDelete}
      >
        Delete Chamber
      </button>
    </div>
  );
}

export default ManagementReading;
