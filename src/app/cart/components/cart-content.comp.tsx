import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getCart } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import DeleteCartItemButton from "./delete-cart-item-button.comp";
import EmptyCart from "./empty-cart.comp";

const CartContent: FC = () => {
  const dispatch = useAppDispatch();
  const { cart, isPending } = useAppSelector(cartSelector);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (isPending.cart && !cart) {
    return <CenteredLoader />
  }

  const isCartEmpty = (!cart?.items?.length && !isPending.cart) || !cart;
  if (isCartEmpty) {
    return <EmptyCart />
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Img</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
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
                  <TableCell align="right">{cartItem.product.name}</TableCell>
                  <TableCell align="right">{cartItem.price}</TableCell>
                  <TableCell align="right">{cartItem.quantity}</TableCell>
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