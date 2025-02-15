import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import Summary from "../pages/dashboard/Summary";
import Analysis from "../pages/dashboard/Analysis";
import Positions from "../pages/dashboard/Positions";
import Error from "../../_metronic/layout/components/error/Error";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registration */}
        <Route
          path="auth/*"
          element={
            <Navigate
              to="/summary"
              replace
            />
          }
        />

        {/* Dashboard Pages */}
        <Route
          path="/"
          element={<DashboardWrapper />}
        >
          {/* Automatically navigate to Summary on accessing /dashboard */}
          <Route
            index
            element={
              <Navigate
                to="summary"
                replace={true}
              />
            }
          />
          <Route
            path="summary"
            element={<Summary />}
          />
          <Route
            path="analysis"
            element={<Analysis />}
          />
          <Route
            path="positions"
            element={<Positions />}
          />
          <Route
            path="analysis/:id"
            element={<Analysis />}
          />

          {/* Specific Dashboard Routes */}
        </Route>

        {/* Uncomment and use for handling 404 Page Not Found */}
        <Route
          path="*"
          element={<Error />}
        />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
