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
    {front: "Which country shares a border with Canada?", back: "United States of America", difficulty: "green", img: null},
    {front: "How many countries share a border with North Korea?", back: "2", difficulty: "green", img: null},
    {front: "What country has this flag?", back: "Grenada", difficulty: "red", img: "https://random.country/wp-content/uploads/2022/04/grenada-flag.jpg"},
    {front: "What country has this flag?", back: "China", difficulty: "green", img: "https://random.country/wp-content/uploads/2022/04/china-flag.jpg"},
    {front: "What country has this flag?", back: "United States of America", difficulty: "green", img: "https://random.country/wp-content/uploads/2022/04/united-states-of-america-flag.jpg"},
    {front: "What country has this flag?", back: "Egypt", difficulty: "yellow", img: "https://random.country/wp-content/uploads/2022/04/egypt-flag.jpg"},
    {front: "What country has this flag?", back: "Venezuela", difficulty: "yellow", img: "https://random.country/wp-content/uploads/2022/04/venezuela-flag.jpg"},
  ];

  const [flipped, setFlipped] = useState(false);
  const [currIdx, setCurrIdx] = useState(Math.floor(Math.random() * data.length)); 

  const getNewCardIdx = (currIdx) => {
    let idx = currIdx;
    do {
      idx = Math.floor(Math.random() * data.length);
    } while (idx === currIdx);
    return idx;
  }

  return (
    <div>
      <h1>The Ultimate Geography Test!</h1>
      <h2>How good is your geography? Test your knowledge here!</h2>
      <h3>Number of cards: {data.length}</h3>
      <div className="card-container">
        <div className={"card " + (flipped ? "" : "un") + "flipped " + (data[currIdx].difficulty)} onClick={() => {setFlipped(!flipped)}}>
          <Card flipped={flipped} front={data[currIdx].front} back={data[currIdx].back} img={data[currIdx].img} />
        </div>
      </div>
      <button className="next-btn" onClick={() => {setCurrIdx(getNewCardIdx(currIdx)); setFlipped(false)}}>⭢</button>
    </div>
  )
}

export default App
