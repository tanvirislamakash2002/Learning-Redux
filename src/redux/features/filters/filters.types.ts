import { TTaskPriorityType, TTaskStatus } from "../tasks";

export type TPriorityFilter = "all" | TTaskPriorityType;
export type TStatusFilter = "all" | TTaskStatus
export type TSortMode = "newest" | "oldest"

export interface IFilterStatus {
    query: string;
    priority: TPriorityFilter;
    status: TStatusFilter;
    sort: TSortMode
}