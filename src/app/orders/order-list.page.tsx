import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import OrderTable from "./components/order-table.comp";

const OrderListPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <OrderTable />
      </Layout>
    </>
  )
}

export default OrderListPage;