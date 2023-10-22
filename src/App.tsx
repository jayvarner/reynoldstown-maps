import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DoorCount from './components/DoorCount'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DoorCount />
  )
}

export default App
