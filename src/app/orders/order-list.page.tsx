import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";

const OrderList: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <div>Order List</div>
      </Layout>
    </>
  )
}

export default OrderList;