import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import CartTableWithPlaceOrderBtn from "./components/cart-table-with-place-order-btn.comp";

const CartViewPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <CartTableWithPlaceOrderBtn />
      </Layout>
    </>
  )
}

export default CartViewPage;