import { TableRow, TableCell, Skeleton } from "@mui/material";
import { FC } from "react";

interface TableRowsLoaderProps {
  rowsCount: number;
  cellsCount: number
}

const TableRowsLoader: FC<TableRowsLoaderProps> = ({ rowsCount, cellsCount }) => {
  const tableCells = (
    <>
      {
        [...Array(cellsCount)].map(() => {
          return (
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          )
        })
      }
    </>
  );


  return (
    <>
      {
        [...Array(rowsCount)].map((row, index) => (
          <TableRow key={index}>
            {tableCells}
          </TableRow>
        ))
      }
    </>
  )

};

export default TableRowsLoader;