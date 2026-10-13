
'use client';
import { FilterIcon } from "lucide-react";
import { TodoEmptyState } from "./todo-empty-state";
import { TaskItem } from "./task-item";
import { Card } from "@/components/ui/card";
import type { ITask } from "@/redux/features/tasks";
import { useAppSelector } from "@/redux/hooks";
import { selectFilteredTasks, selectTotalCount } from "@/redux/features/tasks/tasks.selector";

export function TaskList() {
    const tasks: ITask[] = useAppSelector(selectFilteredTasks);
    const total = useAppSelector(selectTotalCount);
    const isFiltering = false;

    if (total === 0) {
        return (
            <TodoEmptyState />
        );
    }

    if (tasks.length === 0) {
        return (
            <Card className="flex flex-col items-center gap-2 px-6 py-12 text-center text-muted-foreground">
                <FilterIcon className="size-8" />
                <p className="font-medium text-foreground">No matches</p>
                <p className="text-sm">
                    {isFiltering
                        ? "Try clearing or adjusting the filters."
                        : "Nothing matches the current view."}
                </p>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}