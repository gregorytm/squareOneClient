import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

/** Dehu reading detail Page
 *
 * renders information about dehu reading ,
 *
 * Routed at projects/${projId}/reports/${id}
 * id refers to reading id
 *
 */

function DehuReadingDetail() {
  const { projId, reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getReportForUser() {
      async function getReport() {
        setReport(await SquareOneApi.dehuReading(reportId));
      }
      getReport();
    },
    [projId]
  );

  function handleBack() {
    navigate(-1);
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    let result = await SquareOneApi.dehuReadingDelete(reportId);
    if (result.deleted) {
      navigate(-1);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!report) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h3 className="">
        {report.dehuId}, {report.temp}, {report.rh}, {report.readingDate},{" "}
        {reading.dayNumber}
      </h3>

      <button
        className="btn btn-danger btn-block mt-4"
        type="submit"
        onClick={handleDelete}
      >
        Delete Project
      </button>

      <button className="btn btn-secondary btn-block mt-4" onClick={handleBack}>
        Back to Projects
      </button>
    </div>
  );
}

export default DehuReadingDetail;
