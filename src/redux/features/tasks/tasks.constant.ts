import { TTaskPriorityType, TTaskStatus } from "./tasks.type";

export const TASK_STATUS: TTaskStatus[] = ["pending", "in-progress", "done"];

export const STATUS_LABEL: Record<TTaskStatus, string> = {
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