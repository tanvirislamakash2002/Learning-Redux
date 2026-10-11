import React from "react"

interface TodoStatsProps {
  total?: number
  pending?: number
  inProgress?: number
  done?: number
  high?: number
  medium?: number
  low?: number
}

export function TodoStats({
  total = 0,
}: TodoStatsProps) {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-[#121214]/60 px-6 py-5 backdrop-blur-sm shadow-sm">
      <div className="grid grid-cols-7 gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase block">
            TOTAL
          </span>
          <p className="text-2xl font-bold text-white tracking-tight leading-none">
            {total}
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
  )
}
