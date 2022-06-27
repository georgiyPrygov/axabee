import { ILaunch } from "../TableCont/types";

export type Order = 'asc' | 'desc';

export interface TableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ILaunch) => void;
    order: Order;
    orderBy: string;
  }

export interface HeadCell {
    id: keyof ILaunch;
    label: string;
    numeric: boolean;
  }