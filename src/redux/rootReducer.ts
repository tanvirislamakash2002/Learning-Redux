import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counter/counterSlice";
import tasksReducer from "@/redux/features/tasks/tasks.slice";
import filtersReducer from "@/redux/features/filters/filters.slice";
import { persistReducer } from "redux-persist";
import { baseApi } from "./baseApi";

const storage = {
    getItem: (key: string) =>
        typeof window !== "undefined"
            ? Promise.resolve(localStorage.getItem(key))
            : Promise.resolve(null),
    setItem: (key: string, value: string) =>
        typeof window !== "undefined"
            ? Promise.resolve(localStorage.setItem(key, value))
            : Promise.resolve(),
    removeItem: (key: string) =>
        typeof window !== "undefined"
            ? Promise.resolve(localStorage.removeItem(key))
            : Promise.resolve(),
};

const persistConfig = {
    key: "redux-store",
    storage,
    whitelist: ['tasks']
};

export const rootReducer = persistReducer(
    persistConfig,
    combineReducers({
        [baseApi.reducerPath]: baseApi.reducer,
        counter: counterReducer,
        tasks: tasksReducer,
        filters: filtersReducer,
    })
);