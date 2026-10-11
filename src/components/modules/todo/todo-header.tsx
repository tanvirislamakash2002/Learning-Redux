import React from "react"
import { CreateTaskModal } from "./create-task-modal"

export function TodoHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Redux Todo
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          State managed using Redux Toolkit
        </p>
      </div>

      <CreateTaskModal />
    </div>
  )
}
