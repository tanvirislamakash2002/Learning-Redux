"use client"

import React, { useState } from "react"
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

export function TodoFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [sortFilter, setSortFilter] = useState("")

  const handleClearFilters = () => {
    setSearchQuery("")
    setStatusFilter("")
    setPriorityFilter("")
    setSortFilter("")
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="bg-[#121214]/60 border-neutral-800/80 text-white placeholder:text-neutral-500 rounded-xl pl-10 pr-3.5 h-10 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700 w-full"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="w-36">
        <Select
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val ?? "")}
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
          value={priorityFilter}
          onValueChange={(val) => setPriorityFilter(val ?? "")}
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
          value={sortFilter}
          onValueChange={(val) => setSortFilter(val ?? "")}
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
        onClick={handleClearFilters}
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white px-2 py-2 cursor-pointer transition-colors"
      >
        <X className="size-4 stroke-[2.5]" />
        Clear
      </button>
    </div>
  )
}
