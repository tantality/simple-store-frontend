import { refreshTokens } from "app/auth/store/auth.actions";
import { authSelector } from "app/auth/store/auth.selectors";
import { getCart } from "app/cart/store/cart.actions";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import React, { FC, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  const { isAuth } = useAppSelector(authSelector);
  const accessToken = localStorage.getItem("access-token");

  if (isAuth === null && accessToken) {
    return <CenteredLoader />;
  }

  return isAuth ? (
    <Suspense fallback={<CenteredLoader />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={"/auth/login/"} replace />
  );
};

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
      dispatch(getCart())
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthPage} />} />
      <Route path={"/products/*"} element={<PublicRoute element={ProductsPage} />} />
      <Route path={"/orders/*"} element={<PrivateRoute element={OrdersPage} />} />
      <Route path={"/cart/*"} element={<PrivateRoute element={CartPage} />} />

      <Route path='*' element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AppRoutes;