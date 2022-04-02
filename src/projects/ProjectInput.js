import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import ChamberList from "../chamber/ChamberList";
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

function ProjectInput() {
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

  /**Handles delete:
   *
   * if successful redirect to /projects/active
   */

  if (!project) return <LoadingSpinner />;

  return (
    <div className="ProjectCardList">
      <h2 className="text-center">{project.address}</h2>
      <h4 className="text-center">{project.insuredName}</h4>
      <div>
        <ChamberList projId={projId} />
      </div>
    </div>
  );
}

export default ProjectInput;
