"use client"

import { useParams } from "next/navigation"
import { useGetTaskByIdQuery } from "@/redux/baseApi"

export default function TodoDetails() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, isError } = useGetTaskByIdQuery(id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#09090b] text-neutral-100 p-6 md:p-12 lg:px-20">
                <p>Loading task...</p>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen bg-[#09090b] text-neutral-100 p-6 md:p-12 lg:px-20">
                <p>Error loading task</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-neutral-100 p-6 md:p-12 lg:px-20">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-xl font-bold">Todo: {data.title || id}</h1>
                <p className="text-neutral-400">{data.description}</p>
            </div>
        </div>
    )
}
