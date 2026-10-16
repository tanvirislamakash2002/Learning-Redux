'use client';
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PriorityBadge } from "./priority-badge";
import type { ITask, TTaskStatus } from "@/redux/features/tasks";
import { TASK_STATUS } from "@/redux/features/tasks";
import { useAppDispatch } from "@/redux/hooks";
import { updateStatus, removeTask, updateTask } from "@/redux/features/tasks/tasks.slice";
import { useState } from "react";
import EditTaskModal from "./edit-task-modal";

const STATUS_DOT = {
    pending: "bg-slate-400",
    "in-progress": "bg-blue-500",
    done: "bg-emerald-500",
};

export function TaskItem({ task }: { task: ITask }) {
    const dispatch = useAppDispatch();
    const [editOpen, setEditOpen] = useState(false);
    const handleStatusChange = (value: string) => {
        dispatch(updateStatus({ id: task.id, status: value as TTaskStatus }));
    };
    const handleEdit = () => {
        setEditOpen(true);
    };
    const closeEdit = () => {
        setEditOpen(false);
    };

    const handleDelete = () => {
        dispatch(removeTask(task.id));
        toast.success("Task deleted", { description: task.title });
    };

    return (<>
        <Card className="flex flex-row items-start justify-between gap-3 p-4">
            <div className="flex flex-1 flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden
                        className={cn(
                            "inline-block h-2 w-2 rounded-full",
                            // STATUS_DOT[task.status],
                        )}
                    />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {/* {STATUS_LABEL[task.status]} */}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                    </span>
                </div>

                <h3
                    className={cn(
                        "font-semibold leading-tight",
                        task.status === "done" && "line-through text-muted-foreground",
                    )}
                >

                    {task.title}
                </h3>

                {task.description ? (
                    <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                        {task.description}
                    </p>
                ) : null}

                <div className="flex items-center gap-2 pt-1">
                    <PriorityBadge priority={task.priority} />
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Task actions">
                        <MoreHorizontalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={task.status}
                        onValueChange={handleStatusChange}
                    >
                        {TASK_STATUS.map((s) => (
                            <DropdownMenuRadioItem key={s} value={s}>
                                {s}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleEdit}>
                        <PencilIcon className="size-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
                        <Trash2Icon className="size-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Card>

        <EditTaskModal open={editOpen} onClose={closeEdit} task={task} id={task?.id} />
    </>);
}