import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
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
  const history = useHistory();
  const { projId, chamberId } = useParams();

  const [chamber, setChamber] = useState(null);

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
      history.push(`/projects/${projId}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!chamber) return <LoadingSpinner />;

  return (
    <div>
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
      <button type="submit" onClick={handleDelete}>
        Delete Chamber
      </button>

      {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
    </div>
  );
}

export default ChamberDetail;

// function ChamberDetail() {
//   const history = useHistory();
//   const { projId, chamberId } = useParams();

//   const [chamber, setChamber] = useState(null);
//   const [list, setList] = useState(
//     <DehuList chamberId={chamberId} projId={projId} />
//   );
//   const [formErrors, setFormErrors] = useState([]);

//   useEffect(
//     function getChamberForUser() {
//       async function getChamber() {
//         setChamber(await SquareOneApi.getChamber(chamberId));
//       }
//       getChamber();
//     },
//     [chamberId]
//   );

// useEffect(
//   function getRequestedList() {
//     async function getList() {
//       if (list === "DehuList") {
//         setList(<DehuList chamberId={chamberId} projId={projId} />);
//       } else if (list === "MaterialList") {
//         setList(<MaterialList chamberId={chamberId} projId={projId} />);
//       } else if (list === "ReadingForm") {
//         setList(<ChamberReading chamberId={chamberId} />);
//       }
//     }
//     getList();
//   },
//   [list, chamberId, projId]
// );

//   /**Handles delete
//    *
//    * if successful redirects to /projects/:id
//    */

//   async function handleDelete(evt) {
//     evt.preventDefault();
//     let result = await SquareOneApi.deleteChamber(chamberId);
//     if (result.deleted) {
//       history.push(`/projects/${projId}`);
//     } else {
//       setFormErrors(result.errors);
//     }
//   }

//   if (!chamber) return <LoadingSpinner />;

//   return (
//     <div className="">
//       <div onClick={() => setList("DehuList")}>Dehumidifies</div>
//       <div onClick={() => setList("MaterialList")}>Affected Materials</div>
//       <div onClick={() => setList("ReadingForm")}>Readings</div>
//       <h4>{chamber.chamberName}</h4>

//       <button type="submit" onClick={handleDelete}>
//         Delete Chamber
//       </button>

//       {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

//       <div>{list ? list : "Loading..."}</div>
//     </div>
//   );
// }

// export default ChamberDetail;
