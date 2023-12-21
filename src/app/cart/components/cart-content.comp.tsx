import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import MinusIconButton from "components/minus-icon-button.comp";
import PlusIconButton from "components/plus-icon-buttom.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, MouseEvent } from "react";
import { updateCartItem } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import { CartItemDto } from "../types/cart-item.dto";
import DeleteCartItemButton from "./delete-cart-item-button.comp";
import EmptyCart from "./empty-cart.comp";

enum CartItemQuantity {
  Min = 1,
  Max = 100
}

const CartContent: FC = () => {
  const dispatch = useAppDispatch()
  const { cart, isPending } = useAppSelector(cartSelector);

  if (isPending.cart && !cart) {
    return <CenteredLoader />
  }

  const isCartEmpty = (!cart?.items?.length && !isPending.cart) || !cart;
  if (isCartEmpty) {
    return <EmptyCart />
  }

  const handleReduceCartItemQuantity = (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => {
    const changedQuantity = cartItem.quantity - 1;
    if (changedQuantity >= CartItemQuantity.Min) {
      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      dispatch(updateCartItem({ params, body }))
    }
  }

  const handleIncreaseCartItemQuantity = (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => {
    const changedQuantity = cartItem.quantity + 1;
    if (changedQuantity <= CartItemQuantity.Max) {
      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      dispatch(updateCartItem({ params, body }))
    }
  }

  const tableBodyCellStyles = { fontSize: '16px', fontWeight: 500 };
  const tableHeadCellStyles = { fontSize: '15px' };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={tableHeadCellStyles}>Img</TableCell>
              <TableCell align="right" sx={tableHeadCellStyles}>Name</TableCell>
              <TableCell align="right" sx={tableHeadCellStyles}>Unit Price</TableCell>
              <TableCell align="right" sx={tableHeadCellStyles}>Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              cart.items.map((cartItem) => (
                <TableRow
                  key={cartItem.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <img src={cartItem.product.img} alt={cartItem.product.name} width="80px" height="80px" style={{ objectFit: 'cover' }}></img>
                  </TableCell>
                  <TableCell align="right" sx={tableBodyCellStyles}>{cartItem.product.name}</TableCell>
                  <TableCell align="right" sx={tableBodyCellStyles}>${cartItem.price}</TableCell>
                  <TableCell align="right" sx={tableBodyCellStyles}>
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
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartContent;