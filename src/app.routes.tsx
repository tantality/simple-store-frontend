import CenteredLoader from "components/centered-loader.comp";
import React, { FC, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<CenteredLoader />}>
    <Element />
  </Suspense>
);

const AuthPage = React.lazy(() => import("app/auth"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthPage} />} />
    </Routes>
  );
};

export default AppRoutes;