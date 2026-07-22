import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/features/counterSlice";
import { useState } from "react";

const App = () => {

  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)

  const [num, setNum]=useState(5)
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl m-5">{count}</h1>
      <button
        className="bg-red-300 p-4"
        onClick={() => {
          dispatch(increment())
        }}
      >Increment</button>
      <button
        className="bg-green-200 p-4"
        onClick={() => {
          dispatch(decrement())

        }}
      >Decrement</button>
      <input 
      type="number" 
      className="p-4 m-5 border-2"
      value={num}
      onChange={(e)=>{
        setNum(e.target.value)
      }}
      />
      <button
        className="bg-green-200 p-4"
        onClick={() => {
          dispatch(incrementByAmount(Number(num)))

        }}
      >Increment by {num}</button>
    </div>
  );
};

export default App;