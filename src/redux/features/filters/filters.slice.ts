import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IFilterStatus } from "./filters.types";

const initialState: IFilterStatus = {
    query: "",
    priority: "all",
    status: "all",
    sort: "newest",
    page: 1
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeQuery: (state, action) => {
            state.query = action.payload;
            state.page = 1;
        },
        changePriorityFilter: (state, action) => {
            state.priority = action.payload;
            state.page = 1;
        },
        changeStatusFilter: (state, action) => {
            state.status = action.payload;
            state.page = 1;
        },
        changeSortMode: (state, action) => {
            state.sort = action.payload;
            state.page = 1;
        },
        pageChanged: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        clearFilter: () => {
            return initialState
        },
    }
})

export const {
    changeQuery,
    changePriorityFilter,
    changeSortMode,
    changeStatusFilter,
    pageChanged,
    clearFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;