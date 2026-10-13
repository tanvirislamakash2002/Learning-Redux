import { RootState } from "@/redux/store";

export const selectFilters = (state: RootState) => state.filters
export const selectPriorityFilter = (state: RootState) => state.filters.priority
export const selectQuery = (state: RootState) => state.filters.query
export const selectSortMode = (state: RootState) => state.filters.sort
export const selectStatusFilter = (state: RootState) => state.filters.status