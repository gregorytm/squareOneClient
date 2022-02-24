import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { projId } = useParams();

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

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.deleteProject(projId);
    if (result.deleted) {
      history.push("/projects/active");
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!project) return <LoadingSpinner />;

  return (
    <div>
      <h4>{project.insuredAddress}</h4>
      <h3>{project.insuredName}</h3>
      <NavLink className="nav-link" to={`/projects/${projId}/input`}>
        Create Projects and take readings
      </NavLink>
      <NavLink className="nav-link" to={`/projects/${projId}/reports`}>
        Generate project reports
      </NavLink>

      <button type="submit" onClick={handleDelete}>
        Delete Project
      </button>

      {formErrors.length ? <Alert type="danger" message={formErrors} /> : null}
    </div>
  );
}

export default ProjectDetail;

// function ProjectDetail() {
//   const { projId } = useParams();

//   const [project, setProject] = useState(null);
//   const [listType, setListType] = useState("ProjectInput");

//   useEffect(
//     function getProjectForUser() {
//       async function getProject() {
//         setProject(await SquareOneApi.getProject(projId));
//       }
//       getProject();
//     },
//     [projId]
//   );

//   if (!project) return <LoadingSpinner />;

//   let listComponent;
//   if (listType === "ProjectInput") {
//     listComponent = <ProjectInput projectId={projId} />;
//   } else if (listType === "ProjectReports") {
//     listComponent = <ProjectReports projectId={projId} />;
//   }

//   return (
//     <div className="">
//       <h4>{project.address}</h4>
//       <h3>{project.insuredName}</h3>
//       <div onClick={() => setListType("ProjectInput")}>
//         Create projects and readings
//       </div>
//       <div onClick={() => setListType("ProjectReports")}>
//         Generate Project Reports
//       </div>
//       <div>{listComponent ? listComponent : "loading..."}</div>
//     </div>
//   );
// }

// export default ProjectDetail;
