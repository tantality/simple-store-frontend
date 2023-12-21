import Message from "components/message.comp";
import { FC } from "react";

const NoOrders: FC = () => {
  return <Message
    title="Oops, there's nothing here yet!"
    text="You haven't made any purchases yet. Go to the marketplace and make purchases."
    btnProps={{ href: "/products/", text: "Go to Marketplace" }}
  />
}

export default NoOrders;