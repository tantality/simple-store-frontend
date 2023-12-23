import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { FC } from "react";
import { OrderItemDto } from "../types/order-item.dto";
import OrderItemTableBodyRow from "./order-item-table-body-row.comp";

interface OrderItemTableProps {
  items: OrderItemDto[];
}

const OrderItemTable: FC<OrderItemTableProps> = ({ items }) => {
  return (
    <Table size="small" aria-label="purchases" sx={{ minWidth: 750 }}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Img</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Unit Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Final price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => <OrderItemTableBodyRow item={item} key={item.id} />)}
      </TableBody>
    </Table>
  )
};

export default OrderItemTable;