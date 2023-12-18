import CenteredLoader from "components/centered-loader.comp";
import React, { FC, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<CenteredLoader />}>
    <Element />
  </Suspense>
);

const AuthPage = React.lazy(() => import("app/auth"));
const ProductsPage = React.lazy(() => import("app/products"));
const OrdersPage = React.lazy(() => import("app/orders"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthPage} />} />
      <Route path={"/products/*"} element={<PublicRoute element={ProductsPage} />} />
      <Route path={"/orders/*"} element={<PublicRoute element={OrdersPage} />} />

      <Route path='*' element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AppRoutes;