import { TableRow, TableCell } from "@mui/material";
import { FC } from "react";
import { OrderItemDto } from "../types/order-item.dto";

interface OrderItemTableBodyRowProps {
  item: OrderItemDto;
}

const OrderItemTableBodyRow: FC<OrderItemTableBodyRowProps> = ({ item }) => {
  return (
    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="right">
        <img src={item.product.img} alt={item.product.name} width="100px" height="100px" style={{ objectFit: 'cover' }}></img>
      </TableCell>
      <TableCell align="right">{item.product.name}</TableCell>
      <TableCell align="right"> ${item.price}</TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell align="right">${item.quantity * item.price}</TableCell>
    </TableRow>
  );
}

export default OrderItemTableBodyRow;