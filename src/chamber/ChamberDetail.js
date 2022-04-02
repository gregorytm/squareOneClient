import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

/**Chamber Detail Page
 *
 * Renders information about chamber,
 * any dehus listed in chamber listed
 *
 * optional view: affected materials
 *
 */

function ChamberDetail() {
  const { projId, chamberId } = useParams();

  const [chamber, setChamber] = useState(null);

  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getChamberForUser() {
      async function getChamber() {
        setChamber(await SquareOneApi.getChamber(chamberId));
      }
      getChamber();
    },
    [chamberId]
  );

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteChamber(chamberId);
    if (result.deleted) {
      navigate(`/projects/${projId}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!chamber) return <LoadingSpinner />;

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="card">
        <h4>{chamber.chamberName}</h4>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink
              className="nav-link"
              to={`/projects/${projId}/chamber/${chamberId}/dehu/list`}
            >
              Dehumifier List
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink
              className="nav-link"
              to={`/projects/${projId}/chamber/${chamberId}/material/list`}
            >
              Affected Materials
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink
              className="nav-link"
              to={`/projects/${projId}/chamber/${chamberId}/reading`}
            >
              Chamber Reading
            </NavLink>
          </li>
        </ul>
        <button
          className="btn btn-danger btn-block mt-4"
          type="submit"
          onClick={handleDelete}
        >
          Delete Chamber
        </button>

        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}
      </div>
    </div>
  );
}

export default ChamberDetail;
