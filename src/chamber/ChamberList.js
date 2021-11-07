import React, { useState, useEffect } from "react";
import SquareOneApi from "../api/api";
import ChamberCardList from "./ChamberCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of chambers
 *
 * On mount, loads chambers from API
 * Re-loads filtered chambers on submit from search form.
 *
 * ChamberList -> ChamberCardList -> JobCard
 *
 * THis is routed at /chambers
 */

function ChamberList() {
  const [chambers, setChambers] = useState(null);
  console.log("chambers");

  useEffect(function getAllChambersOnMount() {
    search();
  }, []);

  async function search(projectId) {
    let chambers = await SquareOneApi.getChambers(projectId);
    setChambers(chambers);
    console.log(chambers);
  }

  if (!chambers) return <LoadingSpinner />;

  return (
    <div className="">
      {chambers.length ? (
        <ChamberCardList chambers={chambers} />
      ) : (
        <p className="">No chambers were found</p>
      )}
    </div>
  );
}

export default ChamberList;
