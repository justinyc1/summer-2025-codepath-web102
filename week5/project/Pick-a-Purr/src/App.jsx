import { useState } from 'react'
import './App.css'
import Card from './components/Card';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [data, setData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    try {
      let jsonData;
      let violates;
      do {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`);
        jsonData = await response.json();
        violates = checkViolatesBan(jsonData);
      } while (violates);
      setData(jsonData);
      setHistory(prevHistory => (
        [...prevHistory, [jsonData[0].breeds[0].name, jsonData[0].breeds[0].origin, jsonData[0].url]]
      ));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const checkViolatesBan = (jsonData) => {
    const types = ["breed", "weight", "origin", "lifespan"]
    const attributes = [jsonData[0].breeds[0].name, jsonData[0].breeds[0].weight.imperial, jsonData[0].breeds[0].origin, jsonData[0].breeds[0].life_span]
    for (let i = 0; i < types.length; i++) {
      if (bannedAttributes.some(([t, a]) => t === types[i] && a === attributes[i])) {
        // console.log("new result: " + types[i] + ", " + attributes[i] + " is on the ban list."); // debug
        return true;
      }
    }
    return false;
  }

  const banAttribute = (type, attribute) => {
    // if attribute is already banned, don't add it to the banned array
    if (bannedAttributes.length > 0 && bannedAttributes.some(([t, a]) => t === type && a === attribute)) return;
    setBannedAttributes(prevBannedAttributes => (
      [...prevBannedAttributes, [type, attribute]]
    ));
    // console.log(bannedAttributes); // debug
  }

  const removeFromBanList = (type, attribute) => {
    setBannedAttributes(prevBannedAttributes => (
      prevBannedAttributes.filter(
        ([prevType, prevAttribute]) => !(type === prevType && attribute === prevAttribute)
      )
    ));
  }

  return (
    <div className='testing'>
      <div className='left-sidebar'>
        <h1>History</h1>
        <h3>Previously seen cats:</h3>
        {history.map(([breed, country, image]) => (
          <div 
            className='history-div'
            key={`${breed}-${country}-${image}`}
          >
            <img className='history-image' src={image} />
            <div>
              <p>{breed.substring(0, 1).toLowerCase() === "a" ? "An" : "A"} {breed}{breed.slice(-3).toLowerCase() === "cat" ? "" : " cat"} from {country}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='center-container'>
        <div className='center-title'>
          <h1>Pick-a-Purr</h1>
          <h3>Find cats you never thought existed!</h3>
        </div>
        {data && data[0].breeds && (
          <div>
            <Card 
              breed={data[0].breeds[0].name} 
              weight={data[0].breeds[0].weight.imperial} 
              country={data[0].breeds[0].origin} 
              lifespan={data[0].breeds[0].life_span} 
              image={data[0].url} 
              banAttribute={banAttribute}
            />
            <h3>Select an attribute to ban it from future results</h3>
          </div>
        )}    
        <button 
          className='fetch-button' 
          onClick={fetchData}
        >
          Find {data === null ? "a" : "another"} cat 🔍
        </button>
      </div> 
      <div className='right-sidebar'>
        <h1>Ban List</h1>
        <h3>Select an attribute to unban it</h3>
        <div className='unban-buttons-container'>
          {bannedAttributes.map(([type, attribute]) => (
            <button 
              className='unban-button'
              key={`${type}-${attribute}`} 
              onClick={() => {removeFromBanList(type, attribute)}}
            >
              {(type === "weight" ? attribute+" lbs" : (type === "lifespan" ? attribute+" years" : attribute))}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
