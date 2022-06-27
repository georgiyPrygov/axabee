import { ILaunch } from "../TableCont/types";
import { HeadCell, TableHeadProps } from "./types";
import TableHead from "@mui/material/TableHead";
import {TableCell, TableRow, TableSortLabel } from "@mui/material";
import './TableHeadC.css';

const TableHeadC = ({ order, orderBy, onRequestSort }: TableHeadProps) => {
  const createSortHandler =
    (property: keyof ILaunch) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const headCells: readonly HeadCell[] = [
    {
      id: "launch_date_utc",
      numeric: false,
      label: "Data",
    },
    {
      id: "mission_name",
      numeric: true,
      label: "Nazwa misji",
    },
    {
      id: "description",
      numeric: true,
      label: "Opis",
    },
  ];
  return (
    <TableHead>
      <TableRow className="head__row">
        <TableCell>Ulubione</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
     
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadC;
