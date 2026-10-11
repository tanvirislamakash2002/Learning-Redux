"use client"

import React, { useState } from "react"
import { Plus, Search, X, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { STATUS_LABEL, TASK_STATUS } from "@/redux/features/tasks"

export default function TodoPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")
    const [sortFilter, setSortFilter] = useState("")

    // Form states
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [taskStatus, setTaskStatus] = useState("pending")
    const [taskPriority, setTaskPriority] = useState("")

    const handleClearFilters = () => {
        setSearchQuery("")
        setStatusFilter("")
        setPriorityFilter("")
        setSortFilter("")
    }

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault()
        // UI-only for now; close modal and reset fields
        setTitle("")
        setDescription("")
        setTaskStatus("pending")
        setTaskPriority("")
        setIsModalOpen(false)
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-neutral-100 p-6 md:p-12 lg:px-20">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Redux Todo
                        </h1>
                        <p className="text-sm text-neutral-400 mt-0.5">
                            State managed using Redux Toolkit
                        </p>
                    </div>

                    {/* New Task Button & Dialog */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger
                            render={
                                <Button className="bg-white hover:bg-neutral-200 text-neutral-950 font-medium px-4 py-2 h-9 rounded-lg text-sm flex items-center gap-1.5 cursor-pointer shadow-sm border-0 transition-colors">
                                    <Plus className="size-4 stroke-[2.5]" />
                                    New Task
                                </Button>
                            }
                        />

                        <DialogContent className="sm:max-w-[440px] bg-[#121214] border border-neutral-800 text-neutral-100 p-6 rounded-2xl shadow-2xl">
                            <DialogHeader className="gap-1">
                                <DialogTitle className="text-lg font-semibold text-white tracking-tight">
                                    New task
                                </DialogTitle>
                                <DialogDescription className="text-sm text-neutral-400">
                                    Capture what you need to get done.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleCreateTask} className="space-y-4 mt-2">
                                {/* Title */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="task-title"
                                        className="text-sm font-medium text-neutral-200 block"
                                    >
                                        Title
                                    </label>
                                    <Input
                                        id="task-title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="What needs doing?"
                                        className="bg-[#18181b]/80 border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl h-10 px-3.5 focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="task-desc"
                                        className="text-sm font-medium text-neutral-200 block"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        id="task-desc"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Optional details..."
                                        rows={3}
                                        className="bg-[#18181b]/80 border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl px-3.5 py-2.5 min-h-[90px] resize-none focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-700 text-sm"
                                    />
                                </div>

                                {/* Status & Priority Row */}
                                <div className="grid grid-cols-2 gap-3.5">
                                    {/* Status Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-neutral-200 block">
                                            Status
                                        </label>
                                        <Select
                                            value={taskStatus}
                                            onValueChange={(val) => setTaskStatus(val ?? "pending")}
                                        >
                                            <SelectTrigger className="w-full h-10 bg-[#18181b]/80 border-neutral-800 text-white rounded-xl px-3.5 flex justify-between items-center text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                                                {TASK_STATUS.map((status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value="pending"
                                                        className="cursor-pointer">
                                                        {STATUS_LABEL[status]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Priority Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-neutral-200 block">
                                            Priority
                                        </label>
                                        <Select
                                            value={taskPriority}
                                            onValueChange={(val) => setTaskPriority(val ?? "")}
                                        >
                                            <SelectTrigger className="w-full h-10 bg-[#18181b]/80 border-neutral-800 text-white data-placeholder:text-neutral-400 rounded-xl px-3.5 flex justify-between items-center text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                                                <SelectItem value="low" className="cursor-pointer">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="medium" className="cursor-pointer">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high" className="cursor-pointer">
                                                    High
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex items-center justify-end gap-2.5 pt-4 mt-6">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
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
                </div>

                {/* Stats Summary Card */}
                <div className="rounded-2xl border border-neutral-800/80 bg-[#121214]/60 px-6 py-5 backdrop-blur-sm shadow-sm">
                    <div className="grid grid-cols-7 gap-4">
                        <div className="space-y-1">
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                TOTAL
                            </span>
                            <p className="text-2xl font-bold text-white tracking-tight leading-none">
                                0
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                PENDING
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                IN PROGRESS
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                DONE
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                HIGH
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                MEDIUM
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
                                LOW
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
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
                        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "")}>
                            <SelectTrigger className="w-full h-10 bg-[#121214]/60 border-neutral-800/80 text-neutral-300 rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Priority Filter Dropdown */}
                    <div className="w-36">
                        <Select value={priorityFilter} onValueChange={(val) => setPriorityFilter(val ?? "")}>
                            <SelectTrigger className="w-full h-10 bg-[#121214]/60 border-neutral-800/80 text-neutral-300 rounded-xl px-3.5 text-sm focus-visible:ring-1 focus-visible:ring-neutral-600">
                                <SelectValue placeholder="All Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b] border-neutral-800 text-neutral-200 rounded-xl shadow-xl">
                                <SelectItem value="all">All Priority</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Filter Dropdown */}
                    <div className="w-36">
                        <Select value={sortFilter} onValueChange={(val) => setSortFilter(val ?? "")}>
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

                {/* Empty State Card */}
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
            </div>
        </div>
    )
}
