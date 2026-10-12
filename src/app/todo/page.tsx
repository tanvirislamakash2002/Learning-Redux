import {
    TodoHeader,
    TodoStats,
    TodoFilters,
    TaskList,
} from "@/components/modules/todo"

export default function TodoPage() {

    return (
        <div className="min-h-screen bg-[#09090b] text-neutral-100 p-6 md:p-12 lg:px-20">
            <div className="max-w-5xl mx-auto space-y-6">
                <TodoHeader />
                <TodoStats />
                <TodoFilters />
                <TaskList />
            </div>
        </div>
    )
}
