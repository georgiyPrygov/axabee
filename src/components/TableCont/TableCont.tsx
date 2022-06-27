import { useEffect, useState } from "react";
import { ILaunch, IMission } from "./types";
import { fetchLaunches, fetchMissions } from "../../api/requests.api";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHeadC from "../TableHeadC/TableHeadC";
import { Order } from "../TableHeadC/types";
import "./TableCont.css";
import TableBodyC from "../TableBodyC/TableBodyC";

const TableCont = () => {
  const [filteredData, setFilteredData] = useState<ILaunch[]>([]);
  const [launches, setLaunches] = useState<ILaunch[]>([]);
  const [missions, setMissions] = useState<IMission[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof ILaunch>("mission_name");

  /* Get launches and missions on component load */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (data.length) {
      setFilteredData(data);
    } else {
      fetchLaunches().then((res) => {
        setLaunches(res);
        const miss = res.map((launch: ILaunch) => {
          fetchMissions(launch.mission_id[0]).then((res) => {
            setMissions((prev) => [...prev, res]);
          });
        });
      });
    }
  }, []);

  /* Sread missions inside launches */
  useEffect(() => {
    if (missions.length === 10) {
      const result = launches.map((x: ILaunch, idx) => ({
        ...x,
        checked: false,
        mission_id: x.mission_id[0],
        description: missions[idx].description,
      }));
      setFilteredData(result);
    }
  }, [launches, missions, setFilteredData]);

  const handleFavorite = (name: string) => {
    setFilteredData((prevState: ILaunch[]) => {
      const newState = prevState.map((obj) => {
        if (obj.mission_name === name) {
          return { ...obj, checked: !obj.checked };
        }
        return obj;
      });

      return newState;
    });
  };

  const handleSorting = (sortField: keyof ILaunch, order: Order) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortField !== "launch_date_utc") {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (order === "asc" ? 1 : -1)
        );
      } else {
        const dateA = new Date(a.launch_date_utc);
        const dateB = new Date(b.launch_date_utc);
        return order === "asc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      }
    });
    setFilteredData(sorted);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ILaunch
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    handleSorting(property, isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    if (filteredData.length) {
      localStorage.setItem("favorites", JSON.stringify(filteredData));
    }
  }, [filteredData]);

  return (
    <TableContainer className="table__container">
      <Table>
        <TableHeadC
          onRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
        <TableBodyC
          filteredData={filteredData}
          handleFavorite={handleFavorite}
        />
      </Table>
    </TableContainer>
  );
};
export default TableCont;
