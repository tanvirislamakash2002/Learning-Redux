/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TASK_STATUS,
  STATUS_LABEL,
  TASK_PRIORITY,
  PRIORITY_LABEL,
  type TTaskStatus,
  type TTaskPriorityType,
} from "@/redux/features/tasks"
import { useAppDispatch } from "@/redux/hooks"
import { addTask } from "@/redux/features/tasks/tasks.slice"
import { useCreateTaskMutation } from "@/redux/baseApi"
import { toast } from "sonner"

export interface TaskFormData {
  title: string
  description: string
  status: TTaskStatus
  priority: TTaskPriorityType
}

export function CreateTaskModal() {
  const [createTask, { isLoading }] = useCreateTaskMutation()
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const { register, handleSubmit, control, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
    },
  })

  const onSubmit = async (values: TaskFormData) => {
    try {
      const res = await createTask(values).unwrap();

      if (res?.id) {
        toast.success("Task Created");
        reset();
        setIsOpen(false);
      }
    } catch (err: any) {
      console.error("Create task error:", err);
      toast.error(err?.data?.message || "Failed to create task");
    }
  }

  const handleCancel = () => {
    reset()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-neutral-200 text-neutral-950 font-medium px-4 py-2 h-9 rounded-lg text-sm gap-1.5 cursor-pointer shadow-sm border-0 transition-colors">
          <Plus className="size-4 stroke-[2.5]" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] bg-[#121214] border border-neutral-800 text-neutral-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-lg font-semibold text-white tracking-tight">
            New task
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Capture what you need to get done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor="task-title"
              className="text-sm font-medium text-neutral-200"
            >
              Title
            </Label>
            <Input
              id="task-title"
              {...register("title", { required: true })}
              placeholder="What needs doing?"
              className="bg-[#18181b]/80 border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl h-10 px-3.5 focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="task-desc"
              className="text-sm font-medium text-neutral-200"
            >
              Description
            </Label>
            <Textarea
              id="task-desc"
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
              onClick={handleCancel}
              className="text-neutral-300 hover:text-white hover:bg-neutral-800/80 px-4 py-2 rounded-lg text-sm font-medium h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white hover:bg-neutral-200 text-neutral-950 font-medium px-4 py-2 rounded-lg text-sm h-9 shadow-sm border-0 transition-colors"
            >
              Create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
