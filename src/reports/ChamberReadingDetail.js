import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** Chamber reading detail page
 *
 * renders information about chamber reading,
 *
 * routed at projects/${projId}/reports/${id}
 * id refers to reading id
 *
 */

function ChamberReadingDetail() {
  const { projId, readingId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getReportForUser() {
      async function getReport() {
        setReport(await SquareOneApi.chamberReadingDetails(readingId));
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
    let result = await SquareOneApi.chamberReadingDelete(readingId);
    if (result.deleted) {
      navigate(`/projects/${projId}/reports/chamber`);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!report) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <p className="">
        <strong>chamber name:</strong> {report.chamberName},{" "}
        <strong>tempature recorderd:</strong> {report.temp},{" "}
        <strong>relative humidity recorded:</strong> {report.rh},{" "}
        <strong>reading date:</strong>{" "}
        {new Date(report.readingDate).toDateString()},{" "}
        <strong>days on project:</strong> {report.dayNumber}
      </p>

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

export default ChamberReadingDetail;
