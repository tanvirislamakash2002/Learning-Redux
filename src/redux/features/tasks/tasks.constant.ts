import { TTaskPriorityType, TTaskType } from "./tasks.type";

export const TASK_STATUS: TTaskType[] = ["pending", "in-progress", "done"];

export const STATUS_LABEL: Record<TTaskType, string> = {
    pending: "Pending",
    "in-progress": "In Progress",
    done: "Done"
}

export const TASK_PRIORITY: TTaskPriorityType[] = ["low", "medium", "high"];

export const PRIORITY_LABEL: Record<TTaskPriorityType, string> = {
    low: "Low",
    medium: "Medium",
    high: "High"
}