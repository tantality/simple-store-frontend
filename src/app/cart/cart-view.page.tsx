import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";

const OrderView: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <div>Cart</div>
      </Layout>
    </>
  )
}

export default OrderView;