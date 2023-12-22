import Message from "components/message.comp";

const ProductListError = () => {
  return (
    <Message
      title="Failed to get products"
      text="Please try again later"
    />
  )
};

export default ProductListError;