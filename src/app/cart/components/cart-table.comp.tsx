import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { FC, MouseEvent, useState, ChangeEvent } from "react";
import { CartDto } from "../types/cart.dto";
import CartTableRow from "./cart-table-row.comp";

interface CartTableProps {
  cart: CartDto;
}

const CartTable: FC<CartTableProps> = ({ cart }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startPosToSliceFrom = currentPage * rowsPerPage;
  const startPosToSliceTo = currentPage * rowsPerPage + rowsPerPage;

  const handleCurrentPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  return (
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
            cart.items
              .slice(startPosToSliceFrom, startPosToSliceTo)
              .map((cartItem) => (
                <CartTableRow
                  key={cartItem.id}
                  cartItem={cartItem}
                  cart={{ id: cart.id, itemsCount: cart.items.length }}
                />
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

export default CartTable;