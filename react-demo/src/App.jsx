import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scoreboard from './components/Scoreboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Scoreboard team1 = "Rockets" team2 = "Thunder"></Scoreboard>
    </>
  )
}

export default App
