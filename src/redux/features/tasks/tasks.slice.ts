import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, TInitialState } from "./tasks.type";

const initialState: TInitialState = []

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            prepare: (input: Pick<ITask, "title" | "description" | "status" | "priority">) => {
                const task = {
                    id: nanoid(),
                    title: input.title.trim(),
                    description: input.description,
                    priority: input.priority,
                    status: input.status,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                return { payload: task }
            },
            reducer: (state, action: PayloadAction<ITask>) => {
                state.push(action.payload)
            }
        }
    }
})

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;