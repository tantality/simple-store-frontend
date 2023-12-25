import Message from "components/message.comp";

const CartError = () => {
  return (
    <Message
      title="Failed to get the cart"
      text="Please try again later"
      btnProps={{ href: "/products", text: "Go to marketplace" }}
    />
  )
};

export default CartError;