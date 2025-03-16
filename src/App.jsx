import { useState } from 'react'
import Body from './components/Body'
import toast, { Toaster } from 'react-hot-toast';
import MovieDialog from "./components/MovieDialog";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Body/>
      <Toaster/>
      <MovieDialog/>
    </>
  )
}

export default App
