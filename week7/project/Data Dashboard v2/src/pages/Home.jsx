import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SectionBarChart from "../components/SectionBarChart";
import ArticlesByDayBarChart from '../components/ArticlesByDayBarChart';
import './Home.css'

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
  const sections = ["home", "us", "world", "arts", "science"];
  const [section, setSection] = useState(sections[0]);
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const radioOptions = [
    { value: "published_date", label: "Date" },
    { value: "title", label: "Title" },
    { value: "abstract", label: "Abstract" },
    { value: "byline", label: "Author(s)" }
  ];
  const [radioButton, setRadioButton] = useState("title");

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
  }, [section]);

  const getDateTime = (dateString, hour, partAfterHour) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[dateString.substring(5, 7)-1];
    const day = dateString.substring(8, 10);
    const date = month + " " + day;
    // example hour = 09
    // example partAfterHour = :42:16
    hour = Number(hour);
    if (hour === 0) {
      return date + ", " + "12" + partAfterHour +" AM";
    } else if (hour > 0 && hour < 12) {
      return date + ", " + Number(hour) + partAfterHour +" AM";
    } else if (hour === 12) {
      return date + ", " + hour + partAfterHour + " PM";
    } else { // hour > 12
      return date + ", " + (hour % 12) + partAfterHour + " PM";
    }
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
    const commonWords = ["said", "put", "cost", "house", "reaches", "reach", "expand", "expands", "back", "shows", "could", "push", "keeps", "over", "top", "into", "get", "as", "that", "just", "found", "the", "of", "for", "in", "to", "a", "by", "and", "is", "at", "what", "after", "say", "on", "new", "know", "it","up", "would", "has", "about", "here", "we", "i", "when", "are", "says", "another", "with", "his", "more", "you", "will", "he", "she", "her", "his", "him", "from", "an", "who", "can", "how", "this", "no", "not", ]
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
    <div className='home-page-container'>
      <div className='header'>
        <h1>Top {data === null ? "" : data.results.length + " "}NYT news articles, as of {data === null ? "..." : getDateTime(data.last_updated.substring(0, 10), data.last_updated.substring(11, 13), data.last_updated.substring(13, 19))}</h1>
      </div>
      <div className='content'>

        <div className='info-container'>
          <div className='info-left'>
            <SectionBarChart articles={data?.results} />
          </div>
          <div className='info-middle'>
            <div className='buttons-container'>
              <span>Section: </span>
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
            <div className='freq'>
              <span className='head'>Most frequent words in titles: </span>
              <div className='body-container'>
                {data === null ? "" : getNMostFreq(getWordFreq("title"), 10).map(({ word }) => (
                  <span className='words' key={word}>{word}</span>
                ))}
              </div>
            </div>
            <div className='filter-container'>
              <span>Filter for a specific keyword: </span>
              <input
                className='user-input'
                value={userInput}
                onChange={(e) => (setUserInput(e.target.value))}
              />
              <br />
              <span> in:</span>
              {radioOptions.map(option => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={radioButton === option.value}
                    onChange={() => setRadioButton(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className='title-tip'>Click on an article's title for more details!</p>
          </div>
          <div className='info-right'>
            <ArticlesByDayBarChart articles={data?.results} />
          </div>
        </div>

        <table className='table-container'>
          <thead className='table-head-container'>
            <tr>
              <th className='title'>Title</th>
              <th className='abstract'>Abstract</th>
              <th className='date'>Date</th>
              <th className='authors'>{"Author(s)"}</th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.results
                .filter((result) => {
                  const words = userInput.split(" OR ").map((w) => w.trim().toLowerCase());
                  return words.some((word) =>
                    result[radioButton]?.toLowerCase().includes(word)
                  );
                })
                .map((result) => (
                  <tr onClick={() => {}} key={result.uri}>
                    <td className="title">
                      <Link to={`/details/${result.uri.substring(14)}`}>{result.section === "opinion" ? "Opinion: " : ""}{result.title}</Link>
                    </td>
                    <td className="abstract">{result.abstract}</td>
                    <td className="date">{result.published_date.substring(0, 10)}</td>
                    <td className="authors">{result.byline.slice(3).replace(" and", ",")}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
