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
    <div>
      <h4>{project.address}</h4>
      <h2>{project.insuredName}</h2>
      <div>
        <ChamberList projId={projId} />
      </div>
    </div>
  );
}

export default ProjectInput;
