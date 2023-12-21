import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MinusIconButton from "components/minus-icon-button.comp";
import PlusIconButton from "components/plus-icon-buttom.comp";
import { FC, MouseEvent } from "react";
import { CartItemQuantity } from "../constants";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDto } from "../types/cart.dto";
import DeleteCartItemButton from "./delete-cart-item-button.comp";

interface CartItemTableProps {
  cart: CartDto;
  onIncreaseCartItemQuantityBtnClick: (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => void;
  onReduceCartItemQuantityBtnClick: (e: MouseEvent<HTMLButtonElement>, cartId: string, cartItem: CartItemDto) => void;
}

const CartItemTable: FC<CartItemTableProps> = ({ cart, ...props }) => {
  const tableBodyCellStyles = { fontSize: '16px', fontWeight: 500 };
  const tableHeadCellStyles = { fontSize: '15px' };

  return (
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
                  <img src={cartItem.product.img} alt={cartItem.product.name} width="100px" height="100px" style={{ objectFit: 'cover' }}></img>
                </TableCell>
                <TableCell align="right" sx={tableBodyCellStyles}>{cartItem.product.name}</TableCell>
                <TableCell align="right" sx={tableBodyCellStyles}>${cartItem.price}</TableCell>
                <TableCell align="right" sx={tableBodyCellStyles}>
                  <Stack flexDirection={'row'} columnGap="15px" justifyContent="flex-end" alignItems="center">
                    <MinusIconButton
                      disabled={cartItem.quantity === CartItemQuantity.Min}
                      onClick={(e) => props.onReduceCartItemQuantityBtnClick(e, cart.id, cartItem)}
                    />
                    {cartItem.quantity}
                    <PlusIconButton
                      disabled={cartItem.quantity === CartItemQuantity.Max}
                      onClick={(e) => props.onIncreaseCartItemQuantityBtnClick(e, cart.id, cartItem)}
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
  )
};

export default CartItemTable;