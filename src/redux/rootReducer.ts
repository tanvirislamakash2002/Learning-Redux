import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counter/counterSlice"
import tasksReducer from "@/redux/features/tasks/tasks.slice"
import filtersReducer from "@/redux/features/filters/filters.slice"

export const rootReducer = combineReducers({
    counter: counterReducer,
    tasks: tasksReducer,
    filters: filtersReducer
})