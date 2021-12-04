import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquareOneApi from "../api/api";
import DehuList from "../dehu/DehuList";
import MaterialList from "../materials/MaterialList";
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
  const { id } = useParams();
  console.log("chamber id", id);

  const [chamber, setChamber] = useState(null);
  const [listState, setListState] = useState(null);

  useEffect(
    function getChamberAndDehusForUser() {
      async function getChamber() {
        setChamber(await SquareOneApi.getChamber(id));
      }
      getChamber();
    },
    [id]
  );

  if (!chamber) return <LoadingSpinner />;

  return (
    <div className="">
      <div onClick={() => setListState("dehuList")}>Dehumidifier's</div>
      <div onClick={() => setListState("materialList")}>Affected Materials</div>
      <div>Readings</div>

      <h4>{chamber.chamberName}</h4>
      <div>{listState === "dehuList" && <DehuList chamberId={id} />}</div>
      <div>
        {listState === "materialList" && <MaterialList chamberId={id} />}
      </div>
    </div>
  );
}

export default ChamberDetail;
