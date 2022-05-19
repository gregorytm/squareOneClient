import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";

/**
 *
 * displays affectedMaterial form and handles changaes to local form state
 * submitting the form calls the API to save, and triggers project reloading
 * throught he site
 */

function MaterialUpdate() {
  let navigate = useNavigate();
  const { projId, chamberId, materialId } = useParams();

  const [formData, setFormData] = useState({
    materialName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getMaterialForform() {
      async function getMaterial() {
        let material = await SquareOneApi.getMaterial(materialId);
        setFormData({
          materialName: material.materialName,
        });
      }
      getMaterial();
    },
    [chamberId]
  );

  async function updateMaterialApiCall(data) {
    try {
      let result = await SquareOneApi.updateMaterial(data);
      return { success: true, result };
    } catch (errors) {
      console.error("update chamber failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSubmit(evt) {
    const { materialName } = formData;
    const newMaterial = { id: materialId, chamberId: chamberId, materialName };

    evt.preventDefault();
    let material = await updateMaterialApiCall(newMaterial);
    if (material.success) {
      navigate(`/projects/${projId}/chamber/${chamberId}/material/list`);
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
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Material</h3>
      <div className="card">
        <div className="card-body">
          <form>
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

export default MaterialUpdate;
