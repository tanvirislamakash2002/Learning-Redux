import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface initialState {
    value: number
}
const initialState: initialState = {
    value: 0,
}
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        incrementByValue: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        decrement: (state) => {
            if (state.value > 0) state.value -= 1;
        },
    }

})

export const selectValue = (state: RootState) => state.counter;
export const { increment, decrement, incrementByValue } = counterSlice.actions;

export default counterSlice.reducer;