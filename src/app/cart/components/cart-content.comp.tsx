import { Stack, Typography } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { FC, useState } from "react";
import { cartSelector } from "../store/cart.selectors";
import CartError from "./cart-error.comp";
import CartTable from "./cart-table.comp";
import EmptyCart from "./empty-cart.comp";
import PlaceOrderButton from "./place-order-button.comp";

const CartContent: FC = () => {
  const { cart, isPending, errors } = useAppSelector(cartSelector);
  const [isPlaceOrderBtnDisabled, setIsPlaceOrderBtnDisabled] = useState<boolean>(false);

  if (errors.cart && !cart) {
    return <CartError />
  }

  if (isPending.cart && !cart) {
    return <CenteredLoader />
  }

  const isCartEmpty = (!cart?.items?.length && !isPending.cart) || !cart;
  if (isCartEmpty) {
    return <EmptyCart />
  }

  return (
    <Stack rowGap="50px">
      <CartTable cart={cart} />
      <Stack flexDirection="row" columnGap="40px" alignItems="center" justifyContent="flex-end">
        <Typography fontSize="1.3rem" fontWeight={600}>{`Total price: $${cart.totalPrice}`}</Typography>
        <PlaceOrderButton isDisabled={isPlaceOrderBtnDisabled} cartId={cart.id} setIsDisabled={setIsPlaceOrderBtnDisabled} />
      </Stack>
    </Stack >
  )
}

export default CartContent;