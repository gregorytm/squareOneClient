import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/**
 *
 * displays chamber form and handles changaes to local form state
 * submitting the form calls the API to save, and triggers project reloading
 * throught he site
 */

function ChamberUpdate() {
  let navigate = useNavigate();
  const { projId, chamberId } = useParams();

  const [formData, setFormData] = useState({
    chamberName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getChamberForForm() {
      async function getChamber() {
        let chamber = await SquareOneApi.getChamber(chamberId);
        setFormData({
          chamberName: chamber.chamberName,
        });
      }
      getChamber();
    },
    [chamberId]
  );

  async function updateChamberApiCall(data) {
    try {
      let result = await SquareOneApi.updateChamber(data);
      return { success: true, result };
    } catch (errors) {
      console.error("update chamber failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSubmit(evt) {
    const { chamberName } = formData;
    const newChamber = { id: chamberId, chamberName, projectId: projId };

    evt.preventDefault();
    let chamber = await updateChamberApiCall(newChamber);
    if (chamber.success) {
      navigate(`/projects/${projId}/chamber/${chamberId}`);
    } else {
      setFormErrors(chamber.errors);
    }
  }

  /** update formData field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Chamber</h3>
      <div className="card">
        <div className="card-body">
          <form>
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
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChamberUpdate;
