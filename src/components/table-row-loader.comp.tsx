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
        [...Array(columnCount)].map((value, index) => {
          return (
            <TableCell key={index}>
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
        [...Array(rowCount)].map((value, index) => (
          <TableRow key={index}>
            {tableColumns}
          </TableRow>
        ))
      }
    </>
  )

};

export default TableRowLoader;