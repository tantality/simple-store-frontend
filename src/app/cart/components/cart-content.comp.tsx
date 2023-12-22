import { Stack, Typography } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItemQuantity } from "../constants";
import { getCart, placeOrder, updateCartItem } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import { CartItemDto } from "../types/cart-item.dto";
import CartError from "./cart-error.comp";
import CartItemTable from "./cart-item-table.comp";
import EmptyCart from "./empty-cart.comp";
import PlaceOrderButton from "./place-order-button.comp";

const CartContent: FC = () => {
  const dispatch = useAppDispatch()
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

  const handleReduceCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => {
    const changedQuantity = cartItem.quantity - 1;

    if (changedQuantity >= CartItemQuantity.Min) {
      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      const response = await dispatch(updateCartItem({ params, body }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to increase the quantity of the product.', { variant: 'error' });
      }
    }
  }

  const handleIncreaseCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => {
    const changedQuantity = cartItem.quantity + 1;

    if (changedQuantity <= CartItemQuantity.Max) {

      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      const response = await dispatch(updateCartItem({ params, body }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to increase the quantity of the product.', { variant: 'error' });
      }
    }
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
      <CartItemTable
        cart={cart}
        onIncreaseCartItemQuantityBtnClick={handleIncreaseCartItemQuantity}
        onReduceCartItemQuantityBtnClick={handleReduceCartItemQuantity}
      />
      <Stack flexDirection="row" columnGap="40px" alignItems="center" justifyContent="flex-end">
        <Typography fontSize="1.3rem" fontWeight={600}>{`Total price: $${cart.totalPrice}`}</Typography>
        <PlaceOrderButton isDisabled={isPlaceOrderBtnDisabled} onClick={(e) => handlePlaceOrderButtonClick(e, cart.id)} />
      </Stack>
    </Stack >
  )
}

export default CartContent;