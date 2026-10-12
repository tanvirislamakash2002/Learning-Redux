import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, TInitialState } from "./tasks.type";

const initialState: TInitialState = []

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<ITask, "id" | "updatedAt">>) => {
            state.push({
                ...action.payload,
                id: crypto.randomUUID(),
                updatedAt: new Date().toISOString(),
            })
        }
    }
})

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;