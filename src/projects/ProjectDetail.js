import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import ChamberList from "../chamber/ChamberCardList";
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
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(
    function getProjectAndChambersForUser() {
      async function getProject() {
        setProject(await SquareOneApi.getProject(id));
      }
      getProject();
    },
    [id]
  );

  if (!project) return <LoadingSpinner />;

  return (
    <div className="ProjectDetail col-md-8 offset-md-2">
      <h4>{project.insuredname}</h4>
      <p>
        {project.address}, created at {project.createdAt.getDate()}{" "}
        {project.createdAt.getMonth()} {project.createdAt.getYear()}
      </p>
      <div>
        <ChamberList />;
      </div>
    </div>
  );
}

export default ProjectDetail;
