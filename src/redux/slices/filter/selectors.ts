import { RootState } from "../../store";


export const selectorSort = (state: RootState) => state.filter.sort;

export const selectorFilter = (state: RootState) => state.filter;
