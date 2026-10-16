/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TASK_STATUS,
  STATUS_LABEL,
  TASK_PRIORITY,
  PRIORITY_LABEL,
  type TTaskStatus,
  type TTaskPriorityType,
  type ITask,
} from "@/redux/features/tasks";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "@/redux/baseApi";
import { toast } from "sonner";

export interface EditTaskFormData {
  title: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriorityType;
}

export interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: ITask | null;
  id?: string;
  editingId?: string;
}

export default function EditTaskModal({
  open,
  onClose,
  task,
  id,
  editingId,
}: EditTaskModalProps) {
  const taskId = id || editingId || task?.id;

  const { data: fetchedTask } = useGetTaskByIdQuery(taskId, {
    skip: !taskId || !open,
  });

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const currentTask = fetchedTask || task;

  const { register, handleSubmit, control, reset } = useForm<EditTaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (open && currentTask) {
      reset({
        title: currentTask.title || "",
        description: currentTask.description || "",
        status: currentTask.status || "pending",
        priority: currentTask.priority || "medium",
      });
    }
  }, [open, currentTask, reset]);

  const onSubmit = async (values: EditTaskFormData) => {
    if (!taskId) {
      toast.error("Task ID not found");
      return;
    }

    try {
      await updateTask({
        id: taskId,
        change: values,
      }).unwrap();

      toast.success("Task updated successfully");
      onClose();
    } catch (err: any) {
      console.error("Update task error:", err);
      toast.error(err?.data?.message || "Failed to update task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[440px] bg-[#121214] border border-neutral-800 text-neutral-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-lg font-semibold text-white tracking-tight">
            Edit Task
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Update the task details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-task-title"
              className="text-sm font-medium text-neutral-200"
            >
              Title
            </Label>
            <Input
              id="edit-task-title"
              {...register("title", { required: true })}
              placeholder="What needs doing?"
              className="bg-[#18181b]/80 border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl h-10 px-3.5 focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-task-desc"
              className="text-sm font-medium text-neutral-200"
            >
              Description
            </Label>
            <Textarea
              id="edit-task-desc"
              {...register("description")}
              placeholder="Optional details..."
              rows={3}
              className="bg-[#18181b]/80 border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl px-3.5 py-2.5 min-h-[90px] resize-none focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700 text-sm"
            />
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Status Select */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-neutral-200">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val as TTaskStatus)}
                  >
                    <SelectTrigger className="w-full h-10 bg-[#18181b]/80 border-neutral-800 text-white rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                      {TASK_STATUS.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="cursor-pointer"
                        >
                          {STATUS_LABEL[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Priority Select */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-neutral-200">
                Priority
              </Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) =>
                      field.onChange(val as TTaskPriorityType)
                    }
                  >
                    <SelectTrigger className="w-full h-10 bg-[#18181b]/80 border-neutral-800 text-white rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                      {TASK_PRIORITY.map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className="cursor-pointer"
                        >
                          {PRIORITY_LABEL[priority]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-neutral-300 hover:text-white hover:bg-neutral-800/80 px-4 py-2 rounded-lg text-sm font-medium h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white hover:bg-neutral-200 text-neutral-950 font-medium px-4 py-2 rounded-lg text-sm h-9 shadow-sm border-0 transition-colors"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EditTaskModal };
