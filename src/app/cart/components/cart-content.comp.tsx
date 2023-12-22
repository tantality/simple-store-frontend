import { Stack, Typography } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import CartError from "./cart-error.comp";
import CartItemTable from "./cart-item-table.comp";
import EmptyCart from "./empty-cart.comp";
import PlaceOrderButton from "./place-order-button.comp";

const CartContent: FC = () => {
  const dispatch = useAppDispatch();
  const { cart, isPending, errors } = useAppSelector(cartSelector);
  const [isPlaceOrderBtnDisabled, setIsPlaceOrderBtnDisabled] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  const handlePlaceOrderButtonClick = async (e: MouseEvent<HTMLButtonElement>, cartId: string) => {
    setIsPlaceOrderBtnDisabled(true);
    const response = await dispatch(placeOrder({ params: { cartId } }));

    if (response.meta.requestStatus === 'rejected') {
      setIsPlaceOrderBtnDisabled(false);
      enqueueSnackbar('Failed to place the order.', { variant: 'error' });
    }
    else {
      enqueueSnackbar('The order is successfully placed.', { variant: 'success' });
      dispatch(getCart());
      navigate('/products/');
    }
  }

  return (
    <Stack rowGap="50px">
      <CartItemTable cart={cart} />
      <Stack flexDirection="row" columnGap="40px" alignItems="center" justifyContent="flex-end">
        <Typography fontSize="1.3rem" fontWeight={600}>{`Total price: $${cart.totalPrice}`}</Typography>
        <PlaceOrderButton isDisabled={isPlaceOrderBtnDisabled} onClick={(e) => handlePlaceOrderButtonClick(e, cart.id)} />
      </Stack>
    </Stack >
  )
}

export default CartContent;