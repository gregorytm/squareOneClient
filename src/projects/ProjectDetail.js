import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

//css
import "./ProjectDetail.css";

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
  let navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [project, setProject] = useState(null);
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

  function handleBack() {
    navigate("/projects/active");
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteProject(projId);
    if (result.deleted) {
      navigate("/projects/active");
    } else {
      setFormErrors(result.errors);
    }
  }

  function LoggedInUser() {
    return (
      <div className="text-center">
        <h4 className="">
          {project.address} - {project.insuredName}
        </h4>
        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/projects/${projId}/input`}
        >
          Create chambers and take readings
        </NavLink>
        <button
          className="btn btn-secondary btn-block mt-4"
          onClick={handleBack}
        >
          Back to Projects
        </button>
        {formErrors.length ? (
          <Alert type="danger" message={formErrors} />
        ) : null}
      </div>
    );
  }

  function LoggedInManagement() {
    return (
      <div className="text-center">
        <h4 className="">
          {project.address} - {project.insuredName}
        </h4>
        <NavLink
          className="btn btn-primary btn-block mt-4"
          to={`/projects/${projId}/input`}
        >
          Create chambers and take readings
        </NavLink>
        <NavLink
          className="btn btn-success btn-block mt-4"
          to={`/projects/${projId}/reports`}
        >
          Generate project reports
        </NavLink>
        <NavLink
          className="btn btn-warning btn-block mt-4"
          to={`/projects/${projId}/update`}
        >
          Edit Project
        </NavLink>
        <button
          className="btn btn-danger btn-block mt-4"
          type="submit"
          onClick={handleDelete}
        >
          Delete Project
        </button>
        <button
          className="btn btn-secondary btn-block mt-4"
          onClick={handleBack}
        >
          Back to Projects
        </button>
        {formErrors.length ? (
          <Alert type="danger" message={formErrors} />
        ) : null}
      </div>
    );
  }

  if (!project) return <LoadingSpinner />;

  return (
    <div>
      {currentUser.role === "admin" ? <LoggedInManagement /> : <LoggedInUser />}
    </div>
  );
}

export default ProjectDetail;
