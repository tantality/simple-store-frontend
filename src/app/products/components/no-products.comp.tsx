import Message from "components/message.comp"
import { FC } from "react";

const NoProducts: FC = () => {
  return <Message
    title="Oops, there's nothing here yet!"
    text="Products are coming soon!"
  />
}

export default NoProducts;