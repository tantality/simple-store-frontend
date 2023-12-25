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

const CartViewPage = React.lazy(() => import("app/cart/cart-view.page"));

const CartRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={CartViewPage} />} />

      <Route path='*' element={<Navigate to="/cart" />} />
    </Routes>
  );
};

export default CartRoutes;