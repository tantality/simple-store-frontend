import { TableRow, TableCell, Stack } from "@mui/material";
import { FC } from "react";
import { CartItemQuantity } from "../constants";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDto } from "../types/cart.dto";
import DeleteCartItemButton from "./delete-cart-item-button.comp";
import IncreaseCartItemQuantityButton from "./increase-cart-item-quantity-button.comp";
import ReduceCartItemQuantityButton from "./reduce-cart-item-quantity-button.comp";

interface CartTableRowProps {
  cart: CartDto;
  cartItem: CartItemDto;
}

const CartTableRow: FC<CartTableRowProps> = ({ cartItem, cart }) => {
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
          <ReduceCartItemQuantityButton
            isDisabled={cartItem.quantity === CartItemQuantity.Min}
            cartId={cart.id}
            cartItem={cartItem}
          />
          {cartItem.quantity}
          <IncreaseCartItemQuantityButton
            isDisabled={cartItem.quantity === CartItemQuantity.Max}
            cartId={cart.id}
            cartItem={cartItem}
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