import CenteredLoader from "components/centered-loader.comp";
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <Element />
    </Suspense>
  );
};

const SignInPage = React.lazy(() => import("app/auth/sign-in.page"));
const SignUpPage = React.lazy(() => import("app/auth/sign-up.page"));

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/sign-in"} element={<Suspended element={SignInPage} />} />
      <Route path={"/sign-up"} element={<Suspended element={SignUpPage} />} />

      <Route path='*' element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
};

export default AuthRoutes;