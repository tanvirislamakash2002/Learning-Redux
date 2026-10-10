"use client"

import { decrement, increment, incrementByValue } from "@/redux/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const { value } = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Counter: {value}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            −
          </button>

          <button
            onClick={() => dispatch(incrementByValue(5))}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +5
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
