import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getUserOrders } from "../store/orders.actions";
import { ordersSelector } from "../store/orders.selectors";

const OrderListContent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isPending } = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(getUserOrders({ query: { excludeCart: true } }))
  }, [dispatch])

  if (isPending.orders && !orders.length) {
    return <CenteredLoader />
  }

  const noOrders = !orders.length && !isPending.orders;
  if (noOrders) {
    return <div>No orders</div>
  }

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
            <TableCell align="right" sx={tableHeadCellStyles}>Final price</TableCell>
            <TableCell align="right" sx={tableHeadCellStyles}>Status</TableCell>
            <TableCell align="right" sx={tableHeadCellStyles}>Date of change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            orders.map((order) => {
              const { items } = order;
              return items.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">
                      <img src={item.product.img} alt={item.product.name} width="100px" height="100px" style={{ objectFit: 'cover' }}></img>
                    </TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>{item.product.name}</TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>${item.price}</TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>{item.quantity}</TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>${item.quantity * item.price}</TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>{order.status}</TableCell>
                    <TableCell align="right" sx={tableBodyCellStyles}>{new Date(order.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                )
              })
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderListContent;