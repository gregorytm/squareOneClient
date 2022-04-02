import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

/** Project Detail Page
 *
 * Renders information about project ,
 * any chambers listed on that project,
 * lets employee create a new chamber for this project
 *
 * Routed at /projects/:id
 *
 * Routes -> ProjectDetail -> ChamberCardList
 */

function ProjectDetail() {
  const { projId } = useParams();

  const [project, setProject] = useState(null);

  let navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getProjectForUser() {
      async function getProject() {
        setProject(await SquareOneApi.getProject(projId));
      }
      getProject();
    },
    [projId]
  );

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteProject(projId);
    if (result.deleted) {
      navigate("/projects/active");
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!project) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h4 className="text-center">
        {project.address} - {project.insuredName}
      </h4>
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/projects/${projId}/input`}
        >
          Create Projects and take readings
        </NavLink>
      </div>
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <NavLink
          className="btn btn-success btn-block mt-4"
          to={`/projects/${projId}/reports`}
        >
          Generate project reports
        </NavLink>
      </div>
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 deleteBtn">
        <button
          className="btn btn-danger btn-block mt-4"
          type="submit"
          onClick={handleDelete}
        >
          Delete Project
        </button>
      </div>

      {formErrors.length ? <Alert type="danger" message={formErrors} /> : null}
    </div>
  );
}

export default ProjectDetail;
