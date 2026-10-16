import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "http://localhost:5000/api",
    }),
    tagTypes: ["Tasks"],
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({ url: "/tasks" }),
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