import { TableRow, TableCell, Skeleton } from "@mui/material";
import { FC } from "react";

interface TableRowLoaderProps {
  rowCount: number;
  columnCount: number
}

const TableRowLoader: FC<TableRowLoaderProps> = ({ rowCount, columnCount }) => {
  const tableColumns = (
    <>
      {
        [...Array(columnCount)].map(() => {
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
        [...Array(rowCount)].map((row, index) => (
          <TableRow key={index}>
            {tableColumns}
          </TableRow>
        ))
      }
    </>
  )

};

export default TableRowLoader;