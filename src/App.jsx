import { fetchPhotos, fetchVideos } from "./api/mediaApi"

function App() {


  return (
    <div className='h-screen w-full bg-gray-950'>
      <button
        className="bg-amber-100 p-4 text-xl font-bold"
        onClick={async () =>{
          const data = await fetchPhotos('cat')
          console.log(data.results)
        }}>Get Photos</button>
      <button
        className="bg-green-100 p-4 text-xl font-bold"
        onClick={async () =>{
          const data = await fetchVideos('cat')
          console.log(data.videos)
        }}>Get Videos</button>
    </div>
  )
}

export default App
