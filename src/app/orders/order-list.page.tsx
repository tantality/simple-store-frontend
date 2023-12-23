import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import OrderTabel from "./components/order-tabel.comp";

const OrderListPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <OrderTabel />
      </Layout>
    </>
  )
}

export default OrderListPage;