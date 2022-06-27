import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SquareOneApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** Material reading deail page
 *
 * renders information about a meterial reading,'
 *
 * router at projects/${projId}/reports/$id}
 * id refers to reading id
 *
 */

function MaterialReadingDetail() {
  const { projId, readingId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(
    function getReportForUser() {
      async function getReport() {
        setReport(await SquareOneApi.materialReadingDetails(readingId));
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
    let result = await SquareOneApi.materialReadingDelete(readingId);
    if (result.deleted) {
      navigate(`/projects/${projId}/reports/materials`);
    } else {
      setFormErrors(result.errors);
    }
  }

  if (!report) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <p className="">
        <strong>mositure content:</strong> {report.moistureContent},{" "}
        <strong>reading date:</strong>{" "}
        {new Date(report.readingDate).toDateString()},{" "}
        <strong>days on project:</strong> {report.dayNumber}
      </p>

      <button
        className="btn btn-danger btn-block mt-4"
        type="submit"
        onClick={handleDelete}
      >
        delete material reading
      </button>

      <button className="btn btn-secondary btn-block mt-4" onClick={handleBack}>
        back to readings list
      </button>
    </div>
  );
}

export default MaterialReadingDetail;
