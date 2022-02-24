import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import ChamberList from "../Reports/ChamberList";
import DehuList from "../Reports/DehuList";
import MaterialList from "../Reports/MaterialList";
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
  const [list, setList] = useState(<ChamberList />);

  useEffect(
    function getProjectForUser() {
      async function getProject() {
        setProject(await SquareOneApi.getProject(projId));
      }
      getProject();
    },
    [projId]
  );

  useEffect(
    function getRequestedList() {
      async function getList() {
        if (list === "ChamberList") {
          setList(<ChamberList />);
        } else if (list === "DehuList") {
          setList(<DehuList />);
        } else if (list === "MaterialList") {
          setList(<MaterialList />);
        }
      }
      getList();
    },
    [list]
  );

  if (!list) return <LoadingSpinner />;

  return (
    <div className="">
      <h4>{project.address}</h4>
      <div onClick={() => setList("ChamberList")}>Chamber Reports</div>
      <div onClick={() => setList("DehuList")}>Dehumidifier Reports</div>
      <div onClick={() => setList("MaterialList")}>Material Reports</div>

      <div>{list ? list : "loading..."}</div>
    </div>
  );
}

export default ProjectReports;
