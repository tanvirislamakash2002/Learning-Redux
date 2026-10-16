import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "./features/tasks";
import { IFilterStatus } from "./features/filters";

interface IPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface ITaskResponse {
    data: ITask[],
    pagination: IPagination
}

interface ITaskParams extends IFilterStatus {
    limit: number
}
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "http://localhost:5000/api",
    }),
    tagTypes: ["Tasks"],
    endpoints: (build) => ({
        getTasks: build.query<ITaskResponse, ITaskParams>({
            query: (params) => ({ url: "/tasks", params }),
            providesTags: ["Tasks"],
        }),
        getTaskById: build.query({
            query: (id) => ({ url: `/tasks/${id}` })
        }),
        createTask: build.mutation({
            query: (body) => ({ url: "/tasks", method: "POST", body }),
            invalidatesTags: ["Tasks"],
        }),
        updateTask: build.mutation({
            query: ({ id, change }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: change
            }),
            invalidatesTags: ["Tasks"],
        })
    })
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useGetTaskByIdQuery,
    useUpdateTaskMutation
} = baseApi;