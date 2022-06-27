import { ILaunch } from "../TableCont/types";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { TableBodyProps } from "./types";

const TableBodyC = ({ filteredData, handleFavorite }: TableBodyProps) => {
  return (
    <TableBody>
      {filteredData.map((item: ILaunch) => (
        <TableRow key={item.mission_name}>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={item.checked}
              onChange={() => handleFavorite(item.mission_name)}
            />
          </TableCell>
          <TableCell>
            {moment(item.launch_date_utc).format("DD MMMM yyyy, HH:MM")}
          </TableCell>
          <TableCell>{item.mission_name}</TableCell>
          <TableCell>{item.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyC;
