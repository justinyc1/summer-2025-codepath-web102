import { useState } from 'react'
import './App.css'

function App() {
  const [apiData, setApiData] = useState(null);

  return (
    <>
      <div className='left'>

      </div>
      <div className='center'>
        <h1>Pick-a-Purr</h1>
        <h3>Find cats you never thought existed!</h3>
        
        <button>Find a cat 🔍</button>
      </div> 
      <div className='right'>

      </div>
    </>
  )
}

export default App
