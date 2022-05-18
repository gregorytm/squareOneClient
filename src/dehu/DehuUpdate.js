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

function DehuUpdate() {
  let navigate = useNavigate();
  const { projId, chamberId, dehuId } = useParams();

  const [formData, setFormData] = useState({
    dehuNumber: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getDehuForForm() {
      async function getDehu() {
        let dehu = await SquareOneApi.getDehu(dehuId);
        setFormData({
          dehuNumber: dehu.dehuNumber,
          location: dehu.location,
        });
      }
      getDehu();
    },
    [dehuId]
  );

  async function updateDehuApiCall(data) {
    try {
      let result = await SquareOneApi.updateDehu(data);
      return { success: true, result };
    } catch (errors) {
      console.error("update chamber failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSubmit(evt) {
    const { dehuNumber, location } = formData;
    const newDehu = {
      id: dehuId,
      dehuNumber: Number(dehuNumber),
      chamberId: Number(chamberId),
      location,
    };

    evt.preventDefault();
    let dehu = await updateDehuApiCall(newDehu);
    if (dehu.success) {
      navigate(`/projects/${projId}/chamber/${chamberId}/dehu/list`);
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
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Dehumidifier</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>dehumidifier number</label>
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

export default DehuUpdate;
