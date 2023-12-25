import { TableRow, TableCell, Collapse, Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { OrderDto } from "../types/order.dto";
import OrderItemTable from "./order-item-table.comp";
import ExpandRowButton from "./expand-row-button.comp";

interface OrderTableRowProps {
  order: OrderDto;
}

const OrderTableBodyRows: FC<OrderTableRowProps> = ({ order }) => {
  const [isOrderItemRowOpened, setIsOrderItemRowOpened] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <ExpandRowButton isRowOpened={isOrderItemRowOpened} setIsRowOpened={setIsOrderItemRowOpened} />
        </TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">{order.items.length}</TableCell>
        <TableCell align="right">${order.totalPrice}</TableCell>
        <TableCell align="right">{new Date(order.updatedAt).toLocaleString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOrderItemRowOpened} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <OrderItemTable items={order.items} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderTableBodyRows;