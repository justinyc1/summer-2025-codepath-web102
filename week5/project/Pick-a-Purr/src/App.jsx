import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.API_KEY;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`URL/${API_KEY}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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
