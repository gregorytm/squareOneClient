import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
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

  useEffect(
    function getProjectForUser() {
      async function getProject() {
        setProject(await SquareOneApi.getProject(projId));
      }
      getProject();
    },
    [projId]
  );

  if (!project) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h1>{project.address}</h1>
      <nav>
        <Link to="chamber">Chamber Reports</Link> |{" "}
        <Link to="dehus">Dehumidifier Reports</Link> |{" "}
        <Link to="materials">Material Reports</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectReports;
