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

const ProductListPage = React.lazy(() => import("app/products/product-list.page"));

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductListPage} />} />

      <Route path='*' element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default ProductsRoutes;