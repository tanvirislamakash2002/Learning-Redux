export type TTaskType = "pending" | "in-progress" | "done"
export type TTaskPriorityType = "low" | "medium" | "high"

export interface ITask {
    id: string;
    title: string;
    description: string;
    priority: TTaskPriorityType;
    status: TTaskType;
    createdAt: number;
    updatedAt: number;
}


export type TInitialState = ITask[]