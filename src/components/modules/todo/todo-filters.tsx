"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
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
} from "@/redux/features/tasks"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changePriorityFilter, changeQuery, changeSortMode, changeStatusFilter, clearFilter, selectPriorityFilter, selectQuery, selectSortMode, selectStatusFilter } from "@/redux/features/filters"

export function TodoFilters() {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const status = useAppSelector(selectStatusFilter)
  const priority = useAppSelector(selectPriorityFilter)
  const sort = useAppSelector(selectSortMode)

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        <Input
          value={query}
          onChange={(e) => dispatch(changeQuery(e.target.value))}
          placeholder="Search tasks..."
          className="bg-[#121214]/60 border-neutral-800/80 text-white placeholder:text-neutral-500 rounded-xl pl-10 pr-3.5 h-10 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700 w-full"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="w-36">
        <Select
          value={status}
          onValueChange={(value) => dispatch(changeStatusFilter(value))}
        >
          <SelectTrigger className="w-full h-10 bg-[#121214]/60 border-neutral-800/80 text-neutral-300 rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
            <SelectItem value="all">All Status</SelectItem>
            {TASK_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {STATUS_LABEL[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter Dropdown */}
      <div className="w-36">
        <Select
          value={priority}
          onValueChange={(value) => dispatch(changePriorityFilter(value))}
        >
          <SelectTrigger className="w-full h-10 bg-[#121214]/60 border-neutral-800/80 text-neutral-300 rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
            <SelectItem value="all">All Priority</SelectItem>
            {TASK_PRIORITY.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {PRIORITY_LABEL[priority]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Filter Dropdown */}
      <div className="w-36">
        <Select
          value={sort}
          onValueChange={(value) => dispatch(changeSortMode(value))}
        >
          <SelectTrigger className="w-full h-10 bg-[#121214]/60 border-neutral-800/80 text-neutral-300 rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Button */}
      <button
        onClick={() => dispatch(clearFilter())}
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white px-2 py-2 cursor-pointer transition-colors"
      >
        <X className="size-4 stroke-[2.5]" />
        Clear
      </button>
    </div>
  )
}
