import { TableRow, TableCell, Skeleton } from "@mui/material";
import { FC } from "react";

interface TableRowsLoaderProps {
  rowsNum: number;
}

const TableRowsLoader: FC<TableRowsLoaderProps> = ({ rowsNum }) => {
  return (
    <>
      {
        [...Array(rowsNum)].map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          </TableRow>
        ))
      }
    </>
  )

};

export default TableRowsLoader;