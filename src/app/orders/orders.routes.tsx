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

const OrdersListPage = React.lazy(() => import("app/orders/order-list.page"));

const OrdersRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={OrdersListPage} />} />

      <Route path='*' element={<Navigate to="/orders/" />} />
    </Routes>
  );
};

export default OrdersRoutes;