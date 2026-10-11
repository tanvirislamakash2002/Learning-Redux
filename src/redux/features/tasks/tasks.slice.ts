import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    name: string;
    description: string;
    priority: string;
    status: string
}

const initialState = {
    name: "",
    description: "",
    priority: "medium",
    status: "pending"
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {}
})

export default tasksSlice.reducer;