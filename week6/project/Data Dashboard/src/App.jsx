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
  const sections = ["home", "us", "world", "arts", "science"];
  const [section, setSection] = useState(sections[0]);
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");


  const fetchData = async (section) => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`);
      const jsonData = await response.json();
      for (let i = 0; i < jsonData.results.length; i++) {
        const result = jsonData.results[i];
        if (result.title === "" || result.title === "Sign Up for the Science Times Newsletter") {
          jsonData.results.splice(i, 1);
          i--;
        }
      }
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(section);
    updateDate();
  }, [section]);

  const updateDate = () => { 
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setDate(formattedDate);
  }

  const getWordFreq = (resultSection) => {
    const freq = {};

    data.results.map((result) => {
      // clean words
      const words = result[resultSection].toLowerCase().replace(/(['’]s)\b/g, '').replace(/[^\w\s]/g, '').replace(/\d+/g, '').split(/\s+/);

      // get frequency of words
      for (const word of words) {
        if (!word) continue;
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    return freq;
  }

  const getNMostFreq = (freq, n) => {
    const commonWords = ["the", "of", "for", "in", "to", "a", "by", "and", "is", "at", "what", "after", "say", "on", "new", "know", "it","up", "would", "has", "about", "here", "we", "i", "when", "are", "says", "another", "with", "his", "more", "you", "will", "he", "she", "her", "his", "him", "from", "an", "who", "can", "how", "this", "no", "not", ]
    // remove words that appeared once or is common
    for (const word in freq) {
      if (freq[word] === 1 || commonWords.includes(word)) {
        delete freq[word];
      }
    }

    // convert map to array and sort by frequency
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, (n > freq.length ? freq.length : n));

    // 4. Return words and counts
    return sorted.map(([word, count]) => ({ word, count }));
  } 

  return (
    <div>
      <div className='header'>
        <h1>News for {date}</h1>
        <div className='buttons-container'>
          <span>section: </span>
          {sections.map((name, idx) => (
            <button
              key={name}
              className={section === name ? "btn active" : "btn"}
              onClick={() => {setSection(sections[idx])}}
            >
              {name === "us" ? "U.S." : name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))

          }
        </div>
      </div>
      <div className='content'>
        <h4>Top {data === null ? "" : data.results.length + " "}stories of the day:</h4>
        <p>Top 10 most frequent words in titles: {data === null ? "" : getNMostFreq(getWordFreq("title"), 10).map(({ word }) => (
          <span key={word}>{word} </span>
        ))}</p>
        <table className='table-container'>
          <thead className='table-head-container'>
            <tr>
              <th>Title</th>
              <th>Abstract</th>
              <th>Date Published</th>
              <th>{"Author(s)"}</th>
            </tr>
          </thead>
          <tbody className='table-body-container'>
            {data !== null && data.results.map((result) => (
              <tr>
                <td className='table-body-title'>{result.title}</td>
                <td className='table-body-abstract'>{result.abstract}</td>
                <td className='table-body-authors'>{result.published_date.substring(0, 10)}</td>
                <td className='table-body-authors'>{result.byline.slice(3).replace(" and", ",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
