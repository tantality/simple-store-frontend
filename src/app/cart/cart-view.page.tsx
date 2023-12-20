import Header from "components/header.comp";
import Layout from "components/layout.comp";
import { FC } from "react";
import CartContent from "./components/cart-content.comp";

const CartViewPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <CartContent />
      </Layout>
    </>
  )
}

export default CartViewPage;