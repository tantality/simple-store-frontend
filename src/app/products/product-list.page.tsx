import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import ProductList from "./components/product-list.comp";

const ProductListPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <ProductList />
      </Layout>
    </>
  );
}

export default ProductListPage;