import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/**New Affected Material form
 *
 * Shows form and manages update to state on changes.
 * On submission:
 *  - calls new material function prop
 *  - redirects to /projects/:projId/chamber/:chamberId
 *
 * Routers => MaterialForm -> Alert
 * Routed as /projects/:id/chamber/:chamberId/dehu/new
 */

function MaterialForm() {
  const { projId, chamberId } = useParams();
  const [formData, setFormData] = useState({
    chamberId: chamberId,
    materialName: "",
  });
  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  /** handles form submit:
   *
   * calls login func prop, if success redirect to /projects/:projId
   */

  async function newMaterialApiCall(data) {
    try {
      let result = await SquareOneApi.newMaterial(data);
      return { success: true, result };
    } catch (errors) {
      console.error("create new material failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSubmit(evt) {
    const { chamberId: chamber_id, materialName: material_name } = formData;
    const formSafe = { chamber_id, material_name };

    evt.preventDefault();
    let material = await newMaterialApiCall(formSafe);
    if (material.success) {
      navigate(
        `/projects/${projId}/chamber/${chamberId}/material/${material.result.id}/reading`
      );
    } else {
      setFormErrors(material.errors);
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
        <h2 className="mb-3">New Affected Material</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Material Name</label>
                <input
                  name="materialName"
                  required="required"
                  className="form-control"
                  value={formData.materialName}
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

export default MaterialForm;
