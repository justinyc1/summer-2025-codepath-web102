import React, { useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {

  const data = [
    {front: "What is the largest country in the world?", back: "Russia", difficulty: "green", img: null},
    {front: "Which continent is Estonia in?", back: "Europe", difficulty: "yellow", img: null},
    {front: "Which continent is Mexico in?", back: "North America", difficulty: "green", img: null},
    {front: "Which continent is Angola in?", back: "Africa", difficulty: "red", img: null},
    {front: "Which country shares a border with Portugal?", back: "Spain", difficulty: "green", img: null},
    {front: "Which country shares a border with Canada?", back: "United States", difficulty: "green", img: null},
    {front: "How many countries share a border with North Korea?", back: "2", difficulty: "green", img: null},
    {front: "What country has this flag?", back: "Grenada", difficulty: "red", img: "https://random.country/wp-content/uploads/2022/04/grenada-flag.jpg"},
    {front: "What country has this flag?", back: "China", difficulty: "green", img: "https://random.country/wp-content/uploads/2022/04/china-flag.jpg"},
    {front: "What country has this flag?", back: "United States", difficulty: "green", img: "https://random.country/wp-content/uploads/2022/04/united-states-of-america-flag.jpg"},
    {front: "What country has this flag?", back: "Egypt", difficulty: "yellow", img: "https://random.country/wp-content/uploads/2022/04/egypt-flag.jpg"},
    {front: "What country has this flag?", back: "Venezuela", difficulty: "yellow", img: "https://random.country/wp-content/uploads/2022/04/venezuela-flag.jpg"},
  ];

  const [flipped, setFlipped] = useState(false);
  const [currIdx, setCurrIdx] = useState(0); 
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const getNewCardIdx = (dir) => {
    if (dir === 0) { // shuffle
      let idx = currIdx;
      do {
        idx = Math.floor(Math.random() * data.length);
      } while (idx === currIdx);
      return idx;
    } else { // move left or right
      return currIdx + dir;
    }
  }
  
  const [inputBorderColor, setInputBorderColor] = useState("black");
  const [guessText, setGuessText] = useState("");

  const handleChange = (e) => {
    setGuessText(e.target.value);
  }

  function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));
    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[len1][len2];
  }

  const checkGuess = () => {
    // if (guessText.includes(data[currIdx].back)) { // includes correct answer
    if (levenshteinDistance(guessText.toLowerCase(), data[currIdx].back.toLowerCase()) <= data[currIdx].back.length / 8) { // includes correct answer
      setInputBorderColor("green");
      const newCurrentStreak = currentStreak + 1;
      setCurrentStreak(newCurrentStreak);
      if (newCurrentStreak > longestStreak) setLongestStreak(newCurrentStreak);
    } else { // incorrect
      setInputBorderColor("red");
      if (currentStreak > longestStreak) setLongestStreak(currentStreak);
      setCurrentStreak(0)
    }
    setTimeout(setInputBorderColor, 1000, "black");
  }

  return (
    <div>
      <h1>The Ultimate Geography Test!</h1>
      <h2>How good is your geography? Test your knowledge here!</h2>
      <h3>Number of cards: {data.length}</h3>
      <h3>Current Streak: {currentStreak}, Longest Streak: {longestStreak}</h3>
      <div className="card-container">
        <div className={"card " + (flipped ? "" : "un") + "flipped " + (data[currIdx].difficulty)} onClick={() => {setFlipped(!flipped)}}>
          <Card flipped={flipped} front={data[currIdx].front} back={data[currIdx].back} img={data[currIdx].img} />
        </div>
      </div>
      <div className="guess-container">
        <h3>Guess the answer here:</h3>
        <input 
          placeholder='...'
          style={{ borderColor: inputBorderColor }}
          value={guessText}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={checkGuess}>Submit Guess</button>
      </div>
      <div className='button-container'>
        {
          currIdx === 0 
          ? 
          <button className="prev-btn" style={{ color: "gray" }}>⭠</button>
          : 
          <button className="prev-btn" onClick={() => {setCurrIdx(getNewCardIdx(-1)); setFlipped(false); setGuessText("");}}>⭠</button>}
        {
          currIdx === data.length-1 
          ? 
          <button className="next-btn" style={{ color: "gray" }}>⭢</button>
          : 
          <button className="next-btn" onClick={() => {setCurrIdx(getNewCardIdx(1)); setFlipped(false); setGuessText("");}}>⭢</button>
        }
        <button className="shuffle-btn" onClick={() => {setCurrIdx(getNewCardIdx(0)); setFlipped(false); setGuessText("");}}>Shuffle Cards</button>
      </div>
    </div>
  )
}

export default App
