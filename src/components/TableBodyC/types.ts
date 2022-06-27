import { ILaunch } from "../TableCont/types";


export interface TableBodyProps {
    filteredData: ILaunch[];
    handleFavorite: (id: string) => void;
  }