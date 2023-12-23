import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import MinusIconButton from "components/minus-icon-button.comp";
import PlusIconButton from "components/plus-icon-buttom.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { enqueueSnackbar } from "notistack";
import { FC, MouseEvent, useState } from "react";
import { CartItemQuantity } from "../constants";
import { updateCartItem } from "../store/cart.actions";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDto } from "../types/cart.dto";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";
import DeleteCartItemButton from "./delete-cart-item-button.comp";

interface CartItemTableProps {
  cart: CartDto;
}

const CartItemTable: FC<CartItemTableProps> = ({ cart }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();

  const startPosToSliceFrom = currentPage * rowsPerPage;
  const startPosToSliceTo = currentPage * rowsPerPage + rowsPerPage;

  const tableBodyCellStyles = { fontSize: '16px', fontWeight: 500 };
  const tableHeadCellStyles = { fontSize: '15px' };

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

  const handleCurrentPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

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
            cart.items
              .slice(startPosToSliceFrom, startPosToSliceTo)
              .map((cartItem) => (
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
      <TablePagination
        colSpan={3}
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={cart.items.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleCurrentPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
};

export default CartItemTable;