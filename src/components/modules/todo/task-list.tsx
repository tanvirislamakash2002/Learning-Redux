
'use client';
import { FilterIcon } from "lucide-react";
import { TodoEmptyState } from "./todo-empty-state";
import { TaskItem } from "./task-item";
import { Card } from "@/components/ui/card";
import type { ITask } from "@/redux/features/tasks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFilteredTasks, selectTotalCount } from "@/redux/features/tasks/tasks.selector";
import { useGetTasksQuery } from "@/redux/baseApi";
import { pageChanged, selectFilters, selectStatusFilter } from "@/redux/features/filters";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const getPageNumber = (current: number, totalPages: number) => {
    const pages: ("*" | number)[] = [1]

    if (current > 3) {
        pages.push("*")
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);;

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (current < totalPages - 2) {
        pages.push("*")
    }
    pages.push(totalPages)
    return pages
}

export function TaskList() {
    const dispatch = useAppDispatch()
    const filter = useAppSelector(selectFilters)
    const status = useAppSelector(selectStatusFilter)
    const { data, isLoading, isFetching } = useGetTasksQuery({ ...filter, limit: 1 }, {
        refetchOnMountOrArgChange: true
    })
    const tasks = data?.data as ITask[] ?? []
    const pagination = data?.pagination

    const current = pagination?.page || 1;
    const totalPages = pagination?.totalPages || 1;

    const isFiltering = false;

    if (isLoading) {
        return (
            <Card className="flex flex-col items-center gap-2 px-6 py-12 text-center text-muted-foreground">
                <p className="text-sm">Loading tasks...</p>
            </Card>
        )
    }


    if (!isLoading && pagination?.total === 0) {
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
            {
                pagination && totalPages! > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => {
                                        if (pagination.hasPrev) {
                                            dispatch(pageChanged(current - 1))
                                        }
                                    }} />
                            </PaginationItem>
                            {
                                getPageNumber(current, totalPages).map((page, index) =>
                                    page === "*" ? (
                                        <PaginationItem key={`ellipsis-${index}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={page}>
                                            <PaginationLink isActive={page === current} onClick={() => dispatch(pageChanged(page))}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )
                            }
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        if (pagination.hasNext) {
                                            dispatch(pageChanged(current + 1))
                                        }
                                    }} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )
            }
        </div>
    );
}