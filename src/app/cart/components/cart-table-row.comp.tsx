import { TableRow, TableCell, Stack } from "@mui/material";
import MinusIconButton from "components/minus-icon-button.comp";
import PlusIconButton from "components/plus-icon-buttom.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { enqueueSnackbar } from "notistack";
import { FC, MouseEvent } from "react";
import { CartItemQuantity } from "../constants";
import { updateCartItem } from "../store/cart.actions";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDto } from "../types/cart.dto";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";
import DeleteCartItemButton from "./delete-cart-item-button.comp";

interface CartTableRowProps {
  cart: CartDto;
  cartItem: CartItemDto;
}

const CartTableRow: FC<CartTableRowProps> = ({ cartItem, cart }) => {
  const dispatch = useAppDispatch();

  const handleReduceCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>, cartId: CartDtoIdentifier, cartItem: CartItemDto) => {
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

  const handleIncreaseCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>, cartId: CartDtoIdentifier, cartItem: CartItemDto) => {
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

  return (
    <TableRow
      key={cartItem.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="right">
        <img src={cartItem.product.img} alt={cartItem.product.name} width="100px" height="100px" style={{ objectFit: 'cover' }}></img>
      </TableCell>
      <TableCell align="right">{cartItem.product.name}</TableCell>
      <TableCell align="right" >${cartItem.price}</TableCell>
      <TableCell align="right">
        <Stack flexDirection={'row'} columnGap="15px" justifyContent="flex-end" alignItems="center">
          <MinusIconButton
            disabled={cartItem.quantity === CartItemQuantity.Min}
            onClick={(e) => handleReduceCartItemQuantity(e, cart.id, cartItem)}
          />
          {cartItem.quantity}
          <PlusIconButton
            disabled={cartItem.quantity === CartItemQuantity.Max}
            onClick={(e) => handleIncreaseCartItemQuantity(e, cart.id, cartItem)}
          />
        </Stack>
      </TableCell>
      <TableCell align="right">
        <DeleteCartItemButton cart={{ itemsLength: cart.items.length, id: cart.id }} itemId={cartItem.id} />
      </TableCell>
    </TableRow >
  );
}

export default CartTableRow;