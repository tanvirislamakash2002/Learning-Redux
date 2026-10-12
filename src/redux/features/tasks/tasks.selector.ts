import { RootState } from "@/redux/store";

export const selectAllTasks = (state: RootState) => state.tasks;
export const selectTotalCount = (state: RootState) => state.tasks.length;