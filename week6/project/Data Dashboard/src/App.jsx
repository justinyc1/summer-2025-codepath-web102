import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY;

// at least 10 unique items, one per row
// at least 2 features per row
// 3 summaries about data
// useEffect, async await
// search bar to filter item, dynamically
// multiple simulaneous filters
// filter different input types (text, dropdown, buttons, etc)
// user can enter specific bounds for filter values
function App() {
  const [data, setData] = useState(null);

  const fetchData = async (section) => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData("world");
  }, []);

  return (
    <div>
      <div className='header'>
        <h1>News</h1>
      </div>
      <div className='content'>
        {data !== null && "Section: " + data.section}
        {data !== null && data.results.map((result) => {
          return (
            <p>{result.title}</p>
          )
        })}
      </div>
    </div>
  )
}

export default App
