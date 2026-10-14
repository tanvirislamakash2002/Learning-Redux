import {
    FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) =>
        getDefault({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;