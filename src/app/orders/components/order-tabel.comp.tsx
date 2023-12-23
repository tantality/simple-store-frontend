import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { getUserOrders } from "../store/orders.actions";
import { ordersSelector } from "../store/orders.selectors";
import NoOrders from "./no-orders.comp";
import OrderListError from "./order-list-error.comp";
import OrderTableBodyRows from "./order-table-body-rows.comp";

const OrderTabel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const { orders, count, isPending, errors } = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(getUserOrders({
      query: {
        excludeCart: true,
        pageSize: rowsPerPage,
        pageNumber: currentPage
      }
    }))
  }, [currentPage, dispatch, rowsPerPage])

  if (errors.orders) {
    return <OrderListError />;
  }

  if (isPending.orders && !orders.length) {
    return <CenteredLoader />;
  }

  if (count === 0) {
    return <NoOrders />;
  }

  const handleCurrentPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage + 1);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Items count</TableCell>
            <TableCell align="right">Total price</TableCell>
            <TableCell align="right">Date of change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderTableBodyRows key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        colSpan={3}
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={Number(count)}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handleCurrentPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default OrderTabel;
