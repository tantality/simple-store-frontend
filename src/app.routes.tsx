import { refreshTokens } from "app/auth/store/auth.actions";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import React, { FC, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<CenteredLoader />}>
    <Element />
  </Suspense>
);

const AuthPage = React.lazy(() => import("app/auth"));
const ProductsPage = React.lazy(() => import("app/products"));
const OrdersPage = React.lazy(() => import("app/orders"));
const CartPage = React.lazy(() => import("app/cart"));

const AppRoutes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(refreshTokens())
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthPage} />} />
      <Route path={"/products/*"} element={<PublicRoute element={ProductsPage} />} />
      <Route path={"/orders/*"} element={<PublicRoute element={OrdersPage} />} />
      <Route path={"/cart/*"} element={<PublicRoute element={CartPage} />} />

      <Route path='*' element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AppRoutes;