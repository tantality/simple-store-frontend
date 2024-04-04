import Message from "components/message.comp";

const OrderListError = () => {
  return (
    <Message
      title="Failed to get the orders"
      text="Please try again later"
      btnProps={{ href: "/products", text: "Go to marketplace" }}
    />
  )
};

export default OrderListError;