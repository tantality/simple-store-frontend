import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import OrderListContent from "./components/order-list-content.comp";

const OrderListPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <OrderListContent />
      </Layout>
    </>
  )
}

export default OrderListPage;