import React from "react"
import { ClipboardList } from "lucide-react"

export function TodoEmptyState() {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-[#121214]/60 py-24 px-6 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-sm">
      <div className="p-3 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 mb-3.5 text-neutral-400">
        <ClipboardList className="size-8 stroke-[1.5]" />
      </div>
      <h2 className="text-base font-semibold text-white tracking-tight">
        No tasks yet
      </h2>
      <p className="text-sm text-neutral-400 mt-1">
        Click &ldquo;New Task&rdquo; to get started.
      </p>
    </div>
  )
}
