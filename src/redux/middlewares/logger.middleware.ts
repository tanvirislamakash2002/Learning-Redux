import { Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    console.log(store.getState())
    console.log(action)

    next(action)
}