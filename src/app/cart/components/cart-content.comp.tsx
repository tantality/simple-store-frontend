import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getCart } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import EmptyCart from "./empty-cart.comp";

const CartContent: FC = () => {
  const dispatch = useAppDispatch();
  const { cart, isPending } = useAppSelector(cartSelector);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (isPending.cart) {
    return <CenteredLoader />
  }

  if (!cart?.items?.length && !isPending.cart) {
    return <EmptyCart />
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Item</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.items.map((cartItem) => (
              <TableRow
                key={cartItem.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right"></TableCell>
                <TableCell align="right">{cartItem.price}</TableCell>
                <TableCell align="right">{cartItem.quantity}</TableCell>
                <TableCell align="right">
                  <Button>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartContent;