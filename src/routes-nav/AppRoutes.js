import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";

import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import AdminSignup from "../auth/AdminSignup";

import ProjectList from "../projects/ProjectList";
import ProfileForm from "../profiles/ProfileForm";
import ProjectDetail from "../projects/ProjectDetail";
import ProjectForm from "../projects/ProjectForm";
import ProjectInput from "../projects/ProjectInput";
import ProjectUpdate from "../projects/ProjectUpdate";
import ProjectReports from "../reports/ProjectReports";

import ChamberForm from "../chamber/ChamberForm";
import ChamberDetail from "../chamber/ChamberDetail";
import ChamberReading from "../chamber/ChamberReading";
import ChamberReportList from "../reports/ChamberReportList";
import ChamberUpdate from "../chamber/ChamberUpdate";

import DehuForm from "../dehu/DehuForm";
import DehuReading from "../dehu/DehuReading";
import DehuReadingDetail from "../reports/DehuReadingDetail";
import DehuList from "../dehu/DehuList";
import DehuReportList from "../reports/DehuReportList";
import DehuUpdate from "../dehu/DehuUpdate";

import MaterialReading from "../materials/MaterialReading";
import MaterialForm from "../materials/MaterialForm";
import MaterialList from "../materials/MaterialList";
import MaterialReportList from "../reports/MaterialReportList";
import MaterialUpdate from "../materials/MaterialUpdate";

import EmployeeDetail from "../employees/EmployeeDetail";
import EmployeeList from "../employees/EmployeeList";
import EmployeeUnactive from "../employees/EmployeeUnactive";

/** Site-wide routes
 *
 * Parts of the site should only be visiable when logged in  Those routes are wrapped by
 * <PrivateRoute>, which is an authorizaion component
 *
 * visiting non-existant route redirects to the homepage
 */
//TODO: organize this

function AppRoutes({ login, signup, logout }) {
  const currentUser = useCurrentUser();
  return (
    <div className="pt-5">
      <Routes>
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        {!currentUser === "manager" ? (
          <Route to="/login" element={<LoginForm login={login} />} />
        ) : (
          <>
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/projects/active" element={<ProjectList />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:projId" element={<ProjectDetail />} />
            <Route path="/projects/:projId/input" element={<ProjectInput />} />
            <Route
              path="/projects/:projId/update"
              element={<ProjectUpdate />}
            />
            <Route
              path="projects/:projId/reports"
              element={<ProjectReports />}
            />
            <Route
              path="projects/:projId/reports/chamber"
              element={<ChamberReportList />}
            />
            <Route
              path="projects/:projId/reports/dehus"
              element={<DehuReportList />}
            />
            <Route
              path="projects/:projId/reports/materials"
              element={<MaterialReportList />}
            />
            <Route
              path="/projects/:projId/chamber/new"
              element={<ChamberForm />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId"
              element={<ChamberDetail />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/update"
              element={<ChamberUpdate />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/reading"
              element={<ChamberReading />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/dehu/new"
              element={<DehuForm />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/dehu/:dehuId/update"
              element={<DehuUpdate />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/dehu/:dehuId/reading"
              element={<DehuReading />}
            />
            <Route
              path="/projects/:projId/reports/dehus/:reportId"
              element={<DehuReadingDetail />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/material/:materialId/update"
              element={<MaterialUpdate />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/material/list"
              element={<MaterialList />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/dehu/list"
              element={<DehuList />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/material/:materialId/reading"
              element={<MaterialReading />}
            />
            <Route
              path="/projects/:projId/chamber/:chamberId/material/new"
              element={<MaterialForm />}
            />
            <Route path="/employee/personnel" element={<EmployeeList />} />
            <Route path="/employee/pending" element={<EmployeeUnactive />} />
            <Route path="/employee/:empId" element={<EmployeeDetail />} />
            <Route path="/employee/personnel/new" element={<AdminSignup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default AppRoutes;
