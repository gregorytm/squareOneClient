import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** manages project report list page
 *
 * controls the list state for project report page
 *
 * optioanl views: chamber readings, dehu readings, affected material readings
 */

function ProjectReports() {
  const { projId } = useParams();
  const [project, setProject] = useState(null);
  let navigate = useNavigate();

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
    navigate(-1);
  }

  if (!project) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h4>
        {project.address} - {project.insuredName}
      </h4>
      <NavLink className="btn btn-primary btn-block mt-4" to="chamber">
        Chamber Reports
      </NavLink>{" "}
      <NavLink className="btn btn-warning btn-block mt-4" to="dehus">
        Dehumidifier Reports
      </NavLink>{" "}
      <NavLink className="btn btn-success btn-block mt-4" to="materials">
        Material Reports
      </NavLink>
      <button className="btn btn-secondary btn-block mt-4" onClick={handleBack}>
        Back to Projects
      </button>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectReports;
